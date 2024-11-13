

class ListQuery{
    page: number;
    pageSize: number;

    constructor(page: number){
        this.page = page;
        this.pageSize = 10;
    }
}


export { ListQuery };