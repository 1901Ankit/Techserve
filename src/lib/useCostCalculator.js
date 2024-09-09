import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useCostCalculator = ({ initialData, country, selectedServices }) => {
    const [selectedOptions, setSelectedOptions] = useState(initialData);
    const [costs, setCosts] = useState({});
    const router = useRouter()
    useEffect(() => {
        const fetchCosts = async () => {
            try {
                const response = await fetch('/api/website-calculator');
                if (!response.ok) throw new Error('Failed to fetch costs');
                const data = await response.json();
                setCosts(data.data);
            } catch (error) {
                router.refresh();
                console.error('Error fetching costs:', error);
            }
        };

        fetchCosts();
    }, []);

    const toggleSelection = (category, item) => {

        setSelectedOptions(prevState => ({
            ...prevState,
            [category]: prevState[category].includes(item)
                ? prevState[category].filter(i => i !== item)
                : [...prevState[category], item]
        }));
    };
    const selectedOptionsHandler = (category, item) => {
        setSelectedOptions({ ...selectedOptions, [category]: item });
    };

    const getSelectedItemsWithCosts = () => {
        let selectedItemsWithCosts = [];
        // for (const [key, options] of Object.entries(selectedOptions)) {
        //     // console.log(options,key);
        //     if (Object.keys(costs).length > 0) {
        //         for (const [databaseKey, databaseValue] of Object.entries(costs)) {
        //             if (databaseKey == key) {
        //                 // console.log(databaseKey,key);
        //                 if (Array.isArray(databaseValue)) {
        //                     // console.log(databaseValue);
        //                     const category = databaseValue?.find(c => databaseKey == key);
        //                     if (category) {
        //                         options.forEach(option => {
        //                             if (category.name == option) {
        //                                 const cost = category.value.find(v => v.country === country);
        //                                 if (cost) {
        //                                     selectedItemsWithCosts.push({
        //                                         item: option,
        //                                         price: cost.price.web
        //                                     });
        //                                 }
        //                             }
        //                         });
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }


        for (const [key, options] of Object.entries(selectedOptions)) {

            if (Object.keys(costs).length > 0) {
                const categoryCosts = costs[key];
                if (categoryCosts && Array.isArray(categoryCosts)) {
                    options.forEach(option => {
                        const itemCost = categoryCosts.find(cost => cost.name === option);
                        if (itemCost) {
                            const countryCost = itemCost.value.find(v => v.country === country);
                            if (countryCost) {
                                selectedItemsWithCosts.push({
                                    item: option,
                                    price: selectedServices == 'App Development' ? countryCost.price.app : selectedServices == 'Web Development' ? countryCost.price.web : null
                                });
                            }
                        } else {
                            selectedItemsWithCosts.push({
                                item: option,
                                price: "N/A"
                            });
                        }
                    });
                } else {
                    // console.log(options,key);

                    if (Object?.keys(options).length > 0) {
                        for (const [selectedOptionKey, SelectedOptionEnterDetails] of Object.entries(options)) {
                            // console.log(categoryCosts, selectedOptionKey, SelectedOptionEnterDetails);
                        }

                    } else {
                        if (options == true) {
                            selectedItemsWithCosts.push({
                                item: key,
                                price: Number(categoryCosts)
                            });
                        }
                    }
                }
            }

        }
        return selectedItemsWithCosts;
    };


    const calculateTotalCost = () => {
        return getSelectedItemsWithCosts().reduce((total, item) => total + item.price, 0);
    };

    return [selectedOptions, toggleSelection, selectedOptionsHandler, setSelectedOptions, getSelectedItemsWithCosts, calculateTotalCost,];
};

export default useCostCalculator;
