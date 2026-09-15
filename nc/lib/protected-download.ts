// lib/protected-download.ts

export async function downloadProtectedFile(filePath: string, fileName: string) {
  try {
    const token = sessionStorage.getItem("userToken");
    if(!token) {
      window.location.href = `/accedi?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    const response = await fetch(filePath, {
      headers: {Authorization: `Bearer ${token}`},
    });
    if (response.status === 401 || response.status === 403) {
      sessionStorage.removeItem("userToken");
      window.location.href = `/accedi?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    if (!response.ok) {
      throw new Error("Errore durante il download del file.");
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
    console.error("Errore durante il download del file:", error);
    alert("Errore durante il download del file. Riprova più tardi.");
  } 

}