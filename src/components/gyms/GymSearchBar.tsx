
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from 'lucide-react';

interface GymSearchBarProps {
  onSearch?: (search: string, pincode: string) => void;
}

const GymSearchBar: React.FC<GymSearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search, pincode);
    } else {
      // If no onSearch prop, navigate to search page with query params
      navigate(`/gyms?search=${search}&pincode=${pincode}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for gyms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="relative md:w-1/4">
        <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="pl-8"
        />
      </div>
      <Button type="submit">Find Gyms</Button>
    </form>
  );
};

export default GymSearchBar;
