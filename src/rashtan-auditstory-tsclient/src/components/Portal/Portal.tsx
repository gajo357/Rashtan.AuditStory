import React from "react";
import ApiService from "../../services/ApiService";

interface PortalProps {
  apiService: ApiService;
}

const Portal: React.FC<PortalProps> = ({ apiService }) => {
  return <div>Portal</div>;
};

export default Portal;
