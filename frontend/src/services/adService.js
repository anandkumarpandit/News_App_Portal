export const createAd = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/api/ads/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create ad.");
      }
  
      return data;
    } catch (error) {
      console.error("Error in createAd:", error);
      return { error: error.message };
    }
  };