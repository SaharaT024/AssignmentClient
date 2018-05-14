import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCurriculums, changeCurriculums, deleteCurriculums, postCurriculums} from './actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            c: '', // course
            // faculty
        }
    }

    componentDidMount() {
        this.props.fetchCurriculums();
    };


    handleChange = (event) => {
        let name = event.target.name, // Save Event
            value = event.target.value;

        this.setState({
            [name]: value
        })
    };

    handleDelete = (event) => {
        const id = event.target.id; // Delete Value
        this.props.deleteCurriculums(id);
    };

    handleSubmit = () => {
        this.props.postCurriculums(this.state); // Add Value
    };

    render() {
        const {handleChange, handleDelete, handleSubmit} = this;
        const {curriculumsList} = this.props.curriculums;
        if (!curriculumsList)
            return (
                <div>
                    <center>
                    <img src ='https://media.istockphoto.com/vectors/opening-soon-rubber-stamp-vector-id681908042'></img>
                    </center>
                </div>
            );
        else
            return (
                <div>
                    <div style = {{ background:'#48C9B0'}}>
                        <th style = {{fontSize:40}}>College of Computing (CoC)</th>
                    </div>
                    <div style = {{ background:'#F7DC6F'}}>
                    <table>
                        <tr>
                            <th style = {{width: '100px',fontSize: 20}}>No</th>
                            <th style = {{width: '200px',fontSize: 20}}>Course</th>
                            <th style = {{width: '200px',fontSize: 20}}>Optional</th>
                        </tr>
                        <tbody >
                        {  curriculumsList.map((data, index) => {
                                return <tr key={index}>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.c}</td>

                                    <td><button id={data.id}
                                                onClick={handleDelete}>DELETE</button></td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                    <div style = {{ background:'#85C1E9'}}>
                    <from >
                        <th style={{fontSize:20}}>
                            Add Curriculum
                        </th>
                        <br></br>
                        <input type="text" name="c" placeholder="Enter Course Here"
                               onChange={handleChange}style ={{ fontSize: 15}}/>

                        <button onClick={handleSubmit} style={{fontSize: 15}}>SUBMIT</button>
                    </from>
                        </div>
                </div>
            )
    }
}

const mapStateToProps = ({curriculums}) => {
    return {
        curriculums,
    }
};

export default connect(mapStateToProps, {changeCurriculums, fetchCurriculums, deleteCurriculums, postCurriculums})(App);