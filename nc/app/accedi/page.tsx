'use client';
import { Suspense, useState, ChangeEvent, FormEvent, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Ripple,
  TechOrbitDisplay,
  AnimatedForm,
} from '@/components/ui/modern-animated-sign-in';

/**
 * app/accedi/page.tsx
 *
 * Tema chiaro. Colonna sinistra: orbite con i colori dell'arco del logo
 * attorno al lettering ES.A.AR.CO. Colonna destra: form con un solo campo
 * password, stessa logica di prima (POST /api/login, token in
 * sessionStorage, redirect al parametro ?redirect= o a /dispense).
 */

const RED = '#E32726';
const ORANGE = '#F5A623';
const YELLOW = '#FFD200';
const GREEN = '#3AA845';
const BLUE = '#29A9E1';

type OrbitDot = {
  component: () => ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
};

const dot = (color: string, size: number) => () => (
  <span
    style={{
      width: size,
      height: size,
      background: color,
      boxShadow: `0 0 18px ${color}80`,
    }}
    className='block rounded-full'
  />
);

const ring = (color: string, size: number) => () => (
  <span
    style={{
      width: size,
      height: size,
      border: `1.5px solid ${color}`,
    }}
    className='block rounded-full opacity-70'
  />
);

const iconsArray: OrbitDot[] = [
  {
    component: dot(RED, 10),
    className: 'size-[10px] border-none bg-transparent',
    radius: 110,
    duration: 22,
    delay: 0,
    path: true,
  },
  {
    component: ring(ORANGE, 16),
    className: 'size-[16px] border-none bg-transparent',
    radius: 110,
    duration: 22,
    delay: 11,
    path: false,
  },
  {
    component: dot(YELLOW, 12),
    className: 'size-[12px] border-none bg-transparent',
    radius: 175,
    duration: 30,
    delay: 6,
    path: true,
    reverse: true,
  },
  {
    component: dot(GREEN, 8),
    className: 'size-[8px] border-none bg-transparent',
    radius: 175,
    duration: 30,
    delay: 20,
    path: false,
    reverse: true,
  },
  {
    component: dot(BLUE, 14),
    className: 'size-[14px] border-none bg-transparent',
    radius: 250,
    duration: 40,
    delay: 10,
    path: true,
  },
  {
    component: ring(RED, 22),
    className: 'size-[22px] border-none bg-transparent',
    radius: 250,
    duration: 40,
    delay: 30,
    path: false,
  },
  {
    component: dot(ORANGE, 6),
    className: 'size-[6px] border-none bg-transparent',
    radius: 320,
    duration: 55,
    delay: 15,
    path: true,
    reverse: true,
  },
];

function AccediInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dispense';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Password non valida.');
        setLoading(false);
        return;
      }

      sessionStorage.setItem('userToken', data.token);
      setSuccess(true);
      setTimeout(() => router.push(redirectTo), 700);
    } catch {
      setError('Impossibile contattare il server. Riprova più tardi.');
      setLoading(false);
    }
  };

  const formFields = {
    header: success ? 'Accesso consentito' : 'Area riservata',
    subHeader: success
      ? 'Un attimo, ti sto reindirizzando…'
      : 'Inserisci la password consegnata presso la nostra sede.',
    fields: [
      {
        label: 'Password',
        required: true,
        type: 'password' as const,
        placeholder: 'Password',
        onChange: handleInputChange,
      },
    ],
    submitButton: loading
      ? 'Verifica in corso…'
      : success
        ? 'Accesso consentito'
        : "Sblocca l'accesso",
  };

  return (
    <main
      className='flex min-h-[100dvh] max-lg:justify-center'
      style={{
        background: `radial-gradient(circle at 30% 20%, #FFFFFF, #F4F5F7 70%)`,
      }}
    >
      {/* Colonna sinistra */}
      <section className='relative hidden w-1/2 flex-col justify-center border-r border-black/[0.06] lg:flex'>
        <Ripple mainCircleSize={120} numCircles={9} />
        <TechOrbitDisplay
          iconsArray={iconsArray}
          text='ES.A.AR.CO.'
          subtitle='Confederazione Esercenti Agricoltura Artigianato Commercio'
        />
      </section>

      {/* Colonna destra */}
      <section className='relative flex h-[100dvh] w-1/2 flex-col items-center justify-center max-lg:w-full max-lg:px-[10%]'>
        <div className='pointer-events-none absolute inset-0 lg:hidden'>
          <Ripple mainCircleSize={90} numCircles={7} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className='relative z-10 w-full'
        >
          <AnimatedForm
            {...formFields}
            errorField={error}
            loading={loading}
            disabled={success}
            accentColor={BLUE}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </section>
    </main>
  );
}

export default function AccediPage() {
  return (
    <Suspense fallback={null}>
      <AccediInner />
    </Suspense>
  );
}