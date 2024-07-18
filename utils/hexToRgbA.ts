const hexToRgbA = (hex: string, opacity: number) => {
    let c: number;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        const tmp = hex.substring(1).split("");
        let tmp2: string[] = []
        if (tmp.length === 3) {
            tmp2 = [tmp[0], tmp[0], tmp[1], tmp[1], tmp[2], tmp[2]];
        }
        c = parseInt(tmp2.join(""), 16);
        return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},${opacity})`;
    }
    throw new Error("Bad Hex");
};

export {hexToRgbA};
