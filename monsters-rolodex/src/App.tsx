import './App.css';
import {Component, useEffect, useState, ChangeEvent} from 'react'
import CardList from './components/card-list/CardList';
import SearchBox from './components/search-box/SearchBox.component';
import { getData } from './utils/data.utils';

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const  App = () =>{
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  useEffect(() =>{
    const fetchUsers = async () =>{
      const users = await getData<Monster[]>("https://jsonplaceholder.typicode.com/users")
      setMonsters(users)
      setFilteredMonsters(users)
    }
    fetchUsers()
  },[])

    // My own code writed by myself for filtering in challenge
  const searchMonsters = (event:ChangeEvent<HTMLInputElement>): void =>{
    let tmp_filtered_monsters: Monster[] = []
    monsters.map(
      (monster)=>{
        if(monster.name.toLowerCase().includes(event.target.value.toLowerCase())){
          tmp_filtered_monsters.push(monster)
        }
      }
    )
    if(event.target.value.length===0){
      setFilteredMonsters([...monsters])
    }else{
      setFilteredMonsters(tmp_filtered_monsters)
    }
  } 

  return(
    <div className="App">
      <h1 className='app-title'>Monster Rolodex</h1>
      <SearchBox onChangeHandler={searchMonsters} placeholder="Search monsters" className="monsters-search-box" />
      <CardList monsters={filteredMonsters} />
  </div>
  )
}


// It was a first version in class version
// class App_OLD_CLASS extends Component {
//   constructor(props){
//     super()
//     this.state = {
//       monsters:[],
//       filtered_monsters: []
//     }
//   }
//   //this is async way to get monsters im write this code before watch video
//   getMonsters = async () =>{
//     let response = await fetch("https://jsonplaceholder.typicode.com/users")
//     this.setState({monsters: await response.json()})
//   }

//   // My own code writed by myself for filtering in challenge
//   searchMonsters = (event) =>{
//     let tmp_filtered_monsters = []
//     this.state.monsters.map(
//       (monster)=>{
//         if(monster.name.toLowerCase().includes(event.target.value.toLowerCase())){
//           tmp_filtered_monsters.push(monster)
//         }
//       }
//     )
//     if(event.target.value.length===0){
//       this.setState({filtered_monsters: [...this.state.monsters]})
//     }else{
//       this.setState({filtered_monsters: tmp_filtered_monsters})
//     }
//   } 

//   componentDidMount(){
//     //this is way show inside course
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users)=> this.setState({monsters:users, filtered_monsters: users}))

    
//     // this.getMonsters()
//   }

//   render(){
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monster Rolodex</h1>
//         <SearchBox searchMonsters={this.searchMonsters} placeholder="Search monsters" className="monsters-search-box" />
//         <CardList monsters={this.state.filtered_monsters} />
//       </div>
//     );
//   }
// }

export default App;
