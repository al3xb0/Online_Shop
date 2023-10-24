import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = {}
        this._users = []
        this._page = 1
        this._totalCount = 0
        this._limit = 9
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }


    setUser(user) {
        this._user = user
    }


    setIsAdmin(bool)
    {
        this._isAdmin = bool
    }

    setUsers(users) {
        this._users = users
    }

    setPage(page)
    {
        this._page = page
    }

    setTotalCount(totalCount)
    {
        this._totalCount = totalCount
    }

    setLimit(limit)
    {
        this._limit = limit
    }

    get isAuth() {
        return this._isAuth
    }


    get user() {
        return this._user
    }

    get users() {
        return this._users
    }

    get isAdmin()
    {
        return this._isAdmin
    }

    get page()
    {
        return this._page
    }

    get totalCount()
    {
        return this._totalCount
    }

    get limit()
    {
        return this._limit
    }
}