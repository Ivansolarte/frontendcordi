export const validateAddress = async (addressText) => {
    const apiKey = "3e98427cc28e44febca540c03184f9c4"; // Tu API Key de Geoapify
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressText)}&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (!data.features || data.features.length === 0) {
        return {
          valid: false,
          message: "Dirección no encontrada",
          data: null
        };
      }
  
      const result = data.features[0];
      const confidence = result.properties.confidence;
  
      if (confidence < 0.8) {
        return {
          valid: false,
          message: "La dirección es ambigua o no tiene suficiente precisión",
          data: result
        };
      }
  
      return {
        valid: true,
        message: "Dirección válida",
        data: {
          formatted: result.properties.formatted,
          lat: result.properties.lat,
          lon: result.properties.lon,
          country: result.properties.country,
          city: result.properties.city,
          confidence: confidence
        }
      };
    } catch (error) {
      console.error("Error validando la dirección:", error);
      return {
        valid: false,
        message: "Error al conectarse con el servicio de geolocalización",
        data: null
      };
    }
  };
  