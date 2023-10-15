import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Phones'},
            {id: 2, name: 'Laptops'},
            {id: 3, name: 'Headphones'},
            {id: 4, name: 'Lamps'}

        ]
        this._brands = [
            {id: 1, name: 'Apple'},
            {id: 2, name: 'HP'},
            {id: 3, name: 'Apple'},
            {id: 4, name: 'HP'},
            {id: 5, name: 'Apple'},
            {id: 6, name: 'HP'},
        ]
        this._devices = [
            {id: 1, name: 'Iphone 15', price: 1000, rating: 5, img: 'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg'},
            {id: 2, name: 'Iphone 15', price: 1000, rating: 5, img: 'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg'},
            {id: 3, name: 'Iphone 15', price: 1000, rating: 5, img: 'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg'},
            {id: 4, name: 'Iphone 15', price: 1000, rating: 5, img: 'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg'},

        ]
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }


    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type){
        this._selectedType = type
    }

    setSelectedBrand(brand){
        this._selectedBrand = brand
    }

    get types() {
        return this._types
    }


    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }
}