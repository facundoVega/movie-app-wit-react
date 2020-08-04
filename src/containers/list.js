import React, { Fragment } from 'react';
import Card from '../components/card/card';
import Loader from '../components/loader/loader';

const API = process.env.API;

 class List extends React.Component{

    constructor(){
        super();
        this.state = {
            data:[],
            searchTerm:"",
            error:"",
            loading:true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount(){
        const res = await fetch(`${API}&s=batman`);
        const resJson = await res.json();
        this.setState({data:resJson.Search});
        this.setState({loading:false});
    }

    async handleSubmit(e){
        e.preventDefault();
        if(!this.state.searchTerm){
            return this.setState({error:"Please insert a valid value"})

        }
        const res = await  fetch(`${API}&s=${this.state.searchTerm}`);
        const data = await res.json();
        
        if(!data.Search){
            return this.setState({error:"Your search did not trigger any result."});
        }
        this.setState({data:data.Search});
        this.setState({error:""});
        this.setState({searchTerm:""});
    }

    render(){

        const { data , loading} = this.state;
        
        if(loading){
       
        return <Loader />
        }
        return ( 
           <Fragment>
                <div className="row">
                    <div className="col-md-4 offset-md-4 p-4">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" className="form-control" placeholder="search" value={this.state.searchTerm} onChange={(e)=>{this.setState({searchTerm:e.target.value})}} autoFocus/>
                        </form>
                        <p className="text-white">{this.state.error ? this.state.error : ""}</p>
                    </div>
                </div>
                <div className="row">
                    {data.map((movie) =>{ 
                    return <Card  key={movie.imdbID} movie={movie} />
                    })}
                </div>
            </Fragment>
        );
    }
 }

export default List;