const getDocDefinition = () => {
    return {
        content: [
            { text: "Product Info", style: "header" },

            "ID              " + `${id}`,
            "Product Name    " + `${name}`,
            "Brand       " + `${brand}`,
            "Price           " + `${price}`,
            "Category           " + `${category}`
        ]
    };
};

module.exports = getDocDefinition;
