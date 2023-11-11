export declare interface Merch {
    id: number,
    name: string,
    price: number,
    imageSrc: string,
    imageAlt?: string,
    colors: [MerchColor],
    sizes: [MerchSize],
}

export declare interface MerchColor {
    id: number,
    imageSrc: string,
    imageAlt?: string,
    color: string,
    selectedColor: string,
}

export declare interface MerchSize {
    id: number,
    name: string,
    isAvailable: boolean,
}