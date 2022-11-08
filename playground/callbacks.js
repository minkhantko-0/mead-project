const add = (a, b, func) => {
    setTimeout(() => {
        const sum = a + b;

        func(sum);
    }, 2000);
};

add(1, 4, (sum) => {
    console.log(sum);
});
