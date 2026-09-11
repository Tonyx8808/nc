// lib/protected-download.ts

export async function downloadProtectedFile(filePath: string, fileName: string) {
  try {
    const token = localStorage.getItem("userToken");

    if (!token) {
      window.location.href = `/accedi?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    const response = await fetch(filePath, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("userToken");
      window.location.href = `/accedi?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    if (!response.ok) {
      throw new Error(`Errore download: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Errore durante il download:", error);
    alert("Impossibile scaricare il file. Riprova più tardi.");
  }
}