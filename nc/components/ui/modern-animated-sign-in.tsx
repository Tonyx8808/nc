'use client';
import {
  memo,
  ReactNode,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  forwardRef,
} from 'react';
import {
  motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * components/ui/modern-animated-sign-in.tsx
 *
 * Versione adattata a ES.A.AR.CO.:
 * - import da "framer-motion" (già in progetto) invece di "motion/react"
 * - l'input riceve `name` (serve alla validazione del form)
 * - AnimatedForm supporta `loading`, `disabled` e `minLength` per campo
 * - rimossi Google login e tab (non servono: unico campo password)
 * - tema chiaro: testo/bordi in tinte navy (#101827) su sfondo chiaro
 * - i BoxReveal (titolo, sottotitolo, etichetta, campo, bottone) scorrono
 *   a cascata con i colori dell'arco del logo: rosso, giallo, verde, blu
 */

// Colori dell'arco del logo, nell'ordine in cui appaiono nel logo stesso
// (senza arancio/grigio: solo i 4 richiesti)
const ARC_COLORS = ['#E32726', '#FFD200', '#3AA845', '#29A9E1'] as const;
const arcColor = (n: number) => ARC_COLORS[((n % 4) + 4) % 4];

// ==================== Input ====================

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  glowColor?: string;
};

const Input = memo(
  forwardRef(function Input(
    { className, type, glowColor = '#29A9E1', ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const radius = 120;
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className='group/input rounded-lg p-[2px] transition duration-300'
      >
        <input
          type={type}
          className={cn(
            'shadow-input flex h-11 w-full rounded-md border border-black/10 bg-black/[0.03] px-3 py-2 text-[15px] text-[#101827] transition duration-300',
            'placeholder:text-black/35 group-hover/input:shadow-none',
            'focus-visible:ring-[2px] focus-visible:ring-black/15 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  })
);

Input.displayName = 'Input';

// ==================== BoxReveal ====================

type BoxRevealProps = {
  children: ReactNode;
  width?: string;
  boxColor?: string;
  duration?: number;
  overflow?: string;
  position?: string;
  className?: string;
};

const BoxReveal = memo(function BoxReveal({
  children,
  width = 'fit-content',
  boxColor,
  duration,
  overflow = 'hidden',
  position = 'relative',
  className,
}: BoxRevealProps) {
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start('visible');
      mainControls.start('visible');
    } else {
      slideControls.start('hidden');
      mainControls.start('hidden');
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <section
      ref={ref}
      style={{
        position: position as
          | 'relative'
          | 'absolute'
          | 'fixed'
          | 'sticky'
          | 'static',
        width,
        overflow,
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial='hidden'
        animate={mainControls}
        transition={{ duration: duration ?? 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
        initial='hidden'
        animate={slideControls}
        transition={{ duration: duration ?? 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ?? '#1B2740',
          borderRadius: 4,
        }}
      />
    </section>
  );
});

// ==================== Ripple ====================

type RippleProps = {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
};

const Ripple = memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 11,
  className = '',
}: RippleProps) {
  return (
    <section
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center',
        '[mask-image:linear-gradient(to_bottom,black,transparent)]',
        className
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.02;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid';

        return (
          <span
            key={i}
            className='absolute animate-ripple rounded-full bg-black/[0.015]'
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: '1px',
              borderColor: `rgba(16,24,39,${0.05 + i * 0.015})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </section>
  );
});

// ==================== OrbitingCircles ====================

type OrbitingCirclesProps = {
  className?: string;
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
};

const OrbitingCircles = memo(function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          className='pointer-events-none absolute inset-0 size-full'
        >
          <circle
            className='stroke-black/10 stroke-1'
            cx='50%'
            cy='50%'
            r={radius}
            fill='none'
          />
        </svg>
      )}
      <section
        style={
          {
            '--duration': duration,
            '--radius': radius,
            '--delay': -delay,
          } as React.CSSProperties
        }
        className={cn(
          'pointer-events-none absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1000ms)]',
          { '[animation-direction:reverse]': reverse },
          className
        )}
      >
        {children}
      </section>
    </>
  );
});

// ==================== TechOrbitDisplay ====================

type IconConfig = {
  className?: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
  component: () => React.ReactNode;
};

type TechnologyOrbitDisplayProps = {
  iconsArray: IconConfig[];
  text?: string;
  subtitle?: string;
};

const TechOrbitDisplay = memo(function TechOrbitDisplay({
  iconsArray,
  text = 'ES.A.AR.CO.',
  subtitle,
}: TechnologyOrbitDisplayProps) {
  return (
    <section className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden'>
      <span className='font-serif pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#101827] to-[#101827]/40 bg-clip-text text-center text-5xl font-medium leading-none tracking-tight text-transparent xl:text-6xl'>
        {text}
      </span>
      {subtitle && (
        <span className='pointer-events-none z-10 mt-4 max-w-sm text-center text-sm leading-relaxed text-[#101827]/50'>
          {subtitle}
        </span>
      )}

      {iconsArray.map((icon, index) => (
        <OrbitingCircles
          key={index}
          className={icon.className}
          duration={icon.duration}
          delay={icon.delay}
          radius={icon.radius}
          path={icon.path}
          reverse={icon.reverse}
        >
          {icon.component()}
        </OrbitingCircles>
      ))}
    </section>
  );
});

// ==================== AnimatedForm ====================

type FieldType = 'text' | 'email' | 'password';

type Field = {
  label: string;
  required?: boolean;
  type: FieldType;
  placeholder?: string;
  minLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type AnimatedFormProps = {
  header: string;
  subHeader?: string;
  fields: Field[];
  submitButton: string;
  errorField?: string;
  loading?: boolean;
  disabled?: boolean;
  /** colore del glow sui campi e del focus ring (di default il blu dell'arco) */
  accentColor?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type Errors = { [key: string]: string };

const AnimatedForm = memo(function AnimatedForm({
  header,
  subHeader,
  fields,
  submitButton,
  errorField,
  loading = false,
  disabled = false,
  accentColor = '#29A9E1',
  onSubmit,
}: AnimatedFormProps) {
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const toggleVisibility = () => setVisible((v) => !v);

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    const currentErrors: Errors = {};
    const form = event.target as HTMLFormElement;

    fields.forEach((field) => {
      const control = form.elements.namedItem(
        field.label
      ) as HTMLInputElement | null;
      const value = control?.value ?? '';

      if (field.required && !value) {
        currentErrors[field.label] = `Inserisci ${field.label.toLowerCase()}`;
      }

      if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        currentErrors[field.label] = 'Indirizzo email non valido';
      }

      if (field.minLength && value && value.length < field.minLength) {
        currentErrors[
          field.label
        ] = `Almeno ${field.minLength} caratteri`;
      }
    });

    return currentErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formErrors = validateForm(event);

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      onSubmit(event);
    } else {
      setErrors(formErrors);
    }
  };

  // Cascata di colori dell'arco lungo tutte le rivelazioni del form,
  // in ordine di apparizione: titolo -> sottotitolo -> (per ogni campo:
  // etichetta -> riquadro campo) -> errore -> bottone.
  const errorColorIndex = 2 + fields.length * 2;
  const buttonColorIndex = errorColorIndex + 1;

  return (
    <section className='mx-auto flex w-96 flex-col gap-4 max-md:w-full'>
      <BoxReveal boxColor={arcColor(0)} duration={0.3}>
        <h2 className='font-serif text-3xl font-medium text-[#101827]'>{header}</h2>
      </BoxReveal>

      {subHeader && (
        <BoxReveal boxColor={arcColor(1)} duration={0.3} className='pb-2'>
          <p className='max-w-sm text-sm leading-relaxed text-[#101827]/55'>
            {subHeader}
          </p>
        </BoxReveal>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <section className='mb-4 grid grid-cols-1'>
          {fields.map((field, index) => {
            const labelColor = arcColor(2 + index * 2);
            const inputColor = arcColor(3 + index * 2);

            return (
              <section key={field.label} className='flex flex-col gap-2'>
                <BoxReveal boxColor={labelColor} duration={0.3}>
                  <Label htmlFor={field.label}>{field.label}</Label>
                </BoxReveal>

                <BoxReveal
                  width='100%'
                  boxColor={inputColor}
                  duration={0.3}
                  className='flex w-full flex-col space-y-2'
                >
                  <section className='relative'>
                    <Input
                      type={
                        field.type === 'password'
                          ? visible
                            ? 'text'
                            : 'password'
                          : field.type
                      }
                      id={field.label}
                      name={field.label}
                      autoComplete='off'
                      placeholder={field.placeholder}
                      onChange={field.onChange}
                      disabled={disabled}
                      glowColor={accentColor}
                    />

                    {field.type === 'password' && (
                      <button
                        type='button'
                        onClick={toggleVisibility}
                        aria-label={
                          visible ? 'Nascondi password' : 'Mostra password'
                        }
                        className='absolute inset-y-0 right-0 flex items-center pr-4 text-black/40 transition-colors hover:text-black/70'
                      >
                        {visible ? (
                          <Eye className='h-5 w-5' />
                        ) : (
                          <EyeOff className='h-5 w-5' />
                        )}
                      </button>
                    )}
                  </section>

                  <section className='h-4'>
                    {errors[field.label] && (
                      <p className='text-xs text-red-600'>
                        {errors[field.label]}
                      </p>
                    )}
                  </section>
                </BoxReveal>
              </section>
            );
          })}
        </section>

        {errorField && (
          <BoxReveal width='100%' boxColor={arcColor(errorColorIndex)} duration={0.3}>
            <p className='mb-4 text-sm text-red-600'>{errorField}</p>
          </BoxReveal>
        )}

        <BoxReveal
          width='100%'
          boxColor={arcColor(buttonColorIndex)}
          duration={0.3}
          overflow='visible'
        >
          <button
            type='submit'
            disabled={loading || disabled}
            className='group/btn relative block h-11 w-full rounded-md bg-[#101827] font-medium text-white
              shadow-[0px_1px_0px_0px_#ffffff26_inset,0px_-1px_0px_0px_#00000026_inset]
              transition-colors hover:bg-[#1B2740] hover:cursor-pointer
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20
              disabled:cursor-not-allowed disabled:opacity-60'
          >
            {submitButton}
            <BottomGradient />
          </button>
        </BoxReveal>
      </form>
    </section>
  );
});

const BottomGradient = () => {
  return (
    <>
      <span className='absolute -bottom-px inset-x-0 block h-px w-full bg-gradient-to-r from-transparent via-[#E32726] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100' />
      <span className='absolute -bottom-px inset-x-10 mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#3AA845] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100' />
    </>
  );
};

// ==================== Label ====================

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

const Label = memo(function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none text-[#101827]/70',
        className
      )}
      {...props}
    />
  );
});

// ==================== Exports ====================

export {
  Input,
  BoxReveal,
  Ripple,
  OrbitingCircles,
  TechOrbitDisplay,
  AnimatedForm,
  Label,
  BottomGradient,
};