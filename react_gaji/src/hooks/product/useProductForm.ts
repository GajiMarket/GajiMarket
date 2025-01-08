import { useState } from "react";

const useProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [representativeIndex, setRepresentativeIndex] = useState<number | null>(null);
  const [transactionMethod, setTransactionMethod] = useState("판매하기");
  const [acceptPriceSuggestion, setAcceptPriceSuggestion] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files);
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...uploadedFiles];
        if (representativeIndex === null && updatedImages.length > 0) {
          setRepresentativeIndex(0);
        }
        return updatedImages;
      });
    }
  };

  const handleSetRepresentative = (index: number) => {
    setRepresentativeIndex(index);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowMap(false);
  };

  return {
    title,
    setTitle,
    price,
    setPrice,
    description,
    setDescription,
    location,
    setLocation,
    images,
    setImages,
    representativeIndex,
    setRepresentativeIndex,
    transactionMethod,
    setTransactionMethod,
    acceptPriceSuggestion,
    setAcceptPriceSuggestion,
    showMap,
    setShowMap,
    handleImageUpload,
    handleSetRepresentative,
    handleLocationSelect,
  };
};

export default useProductForm;