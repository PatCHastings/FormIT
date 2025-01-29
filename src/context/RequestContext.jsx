import React, { createContext, useState, useContext } from "react";
import api from "../services/api";

export const RequestsContext = createContext(null);

export const RequestsProvider = ({ children }) => {
  // Store a mapping of serviceType -> requestId
  const [requestsMap, setRequestsMap] = useState({});

  /**
   * findOrCreateRequest(serviceType)
   * If already have a requestId for this type, return it.
   * Otherwise call the backend, store it, and return it.
   */
  const findOrCreateRequest = async (serviceType) => {
    // 1) If we already have it, just return it
    if (requestsMap[serviceType]) {
      return requestsMap[serviceType];
    }

    // 2) Call the backend to find or create
    const response = await api.post("/requests/findOrCreate", { serviceType });
    const newRequestId = response.data.requestId;

    // 3) Store in local state so next time we don't re-create
    setRequestsMap((prev) => ({
      ...prev,
      [serviceType]: newRequestId,
    }));

    return newRequestId;
  };

  return (
    <RequestsContext.Provider value={{ requestsMap, findOrCreateRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
