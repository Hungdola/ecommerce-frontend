import { ProductService } from './../../../../State/Product/product.service';
import { Component, OnInit } from '@angular/core';
import { filters, singleFilter } from './FilterData';
import { mensPantsPage1 } from 'src/Data/pants/men_page1';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  filterData: any
  singleFilterData: any
  products: any
  levelThree: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService:ProductService, private store: Store<AppState>) {
    
  }
  
  ngOnInit(): void {
    this.filterData = filters
    this.singleFilterData = singleFilter
    // this.menPants = mensPantsPage1: cái này dùng khi chưa có backend

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.levelThree = params.get("levelThree")
        console.log("params", params)
        var reqData = {
          category: this.levelThree,
          colors: [],
          sizes: [],
          minPrice: 0,
          maxPrice: 10000,
          minDiscount: 0,
          pageNumber: 0,
          pageSize: 10,
          stock: null
        }
        this.productService.findProductByCategory(reqData)
      }
    )

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const color = params["color"]
        const size = params["size"]
        const price = params["price"]
        const discount = params["discount"]
        const stock = params["stock"]
        const sort = params["sort"]
        const pageNumber = params["pageNumber"]
        const minPrice = price.split("-")[0]
        const maxPrice = price.split("-")[1]

        var reqData = {
          category: this.levelThree,
          colors: color?[color].join(","):[],
          sizes: size,
          minPrice: minPrice?minPrice:0,
          maxPrice: maxPrice?maxPrice:100000,
          minDiscount: discount?discount:0,
          pageNumber: pageNumber?pageNumber:0,
          pageSize: 10,
          stock: null,
          sort: sort?sort: "price_low"

      }
      this.productService.findProductByCategory(reqData)
    }
    )

    this.store.pipe(select((store) => store.product)).subscribe((product) => {
      this.products = product.products.content
      console.log("store data ",product.products.content )
    })
  }

  handleMultipleSelectFilter(value: string, sectionId:string) {
    const queryParams = {...this.activatedRoute.snapshot.queryParams}

    console.log("query params: ", queryParams)

    const filterValues = queryParams[sectionId]?queryParams[sectionId].split(','):[]

    console.log("filtervalue: ",filterValues)

    const valueIndex = filterValues.indexOf(value) //này là để tìm vị trí của value có tồn tại trong mảng hay không, nếu không có thì nó sẽ trả về là -1, value là giá trị trong mảng
 
    console.log("value:", value)
    console.log("index:", valueIndex)
    if(valueIndex !=-1) {
      filterValues.splice(valueIndex, 1)
    }

    else {
      filterValues.push(value)
    }

    if(filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(',')
    }
    else {
      delete queryParams[sectionId]
    }

    this.router.navigate([], {queryParams})
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = {...this.activatedRoute.snapshot.queryParams}

    queryParams[sectionId] = value

    this.router.navigate([], {queryParams})
    // console.log(queryParams)
  }

}
