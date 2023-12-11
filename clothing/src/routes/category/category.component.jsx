import './category.styles.scss'
import { useParams } from 'react-router-dom'
import {useState, useEffect } from 'react'
import ProductCard from '../../components/product-card/product-card.component'
import {selectCategoriesMap} from '../../store/categories/category.selector'
import { useSelector } from "react-redux/es/hooks/useSelector"

const Category = () =>{
    const {category} = useParams()
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState([])
    console.log('render/re-rendering category')


    useEffect(()=>{
        console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            
            <div className='category-container'>
                {products &&
                    products.map((product)=> <ProductCard product={product} key={product.id} />)
                }
            </div>
        </>
    )

}

export default Category