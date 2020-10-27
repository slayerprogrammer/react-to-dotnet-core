import React, {Component} from 'react';
import axios from 'axios';

export class Update extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateCompleted = this.onChangeDateCompleted.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            dateStarted: null,
            dateCompleted: null
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;

        axios.get("api/Trips/SingleTrip/"+id).then(trip => {
            const response = trip.data;

            this.setState({
                name: response.name,
                description: response.description,
                dateStarted: new Date(response.dateStarted).toISOString().slice(0,10),
                dateCompleted: response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0,10) : null
            })
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDateStarted(e){
        this.setState({
            dateStarted: e.target.value
        });
    }

    onChangeDateCompleted(e){
        this.setState({
            dateCompleted: e.target.value
        });
    }

    onUpdateCancel(){
        const {history} = this.props;
        history.push('/trips');
    }

    onSubmit(e){
        e.preventDefault();
        const {history} = this.props;
        const {id} = this.props.match.params;

        let tripObject = {
            name: this.state.name,
            description: this.state.description,
            dateStarted: new Date(this.state.dateStarted).toISOString(),
            dateCompleted: this.state.dateCompleted ? new Date(this.state.dateCompleted).toISOString() : null
        }

        axios.put("api/Trips/updateTrip/"+id, tripObject).then(result => {
            history.push('/trips');
        })

    }

    render(){
        return (
            <div className="trip-form" >
                <h3>Güncelleme Sayfası</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Gezi Adı:  </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={this.state.name}
                          onChange={this.onChangeName}
                         />
                    </div>
                    <div className="form-group">
                        <label>Gezi Açıklaması: </label>
                        <textarea 
			  type="text" 
                          className="form-control"
                          value={this.state.description}
                          onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="row">
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Geziye Başlama:  </label>
                                <input 
                                  type="date" 
                                  className="form-control" 
                                  value={this.state.dateStarted}
                                  onChange={this.onChangeDateStarted}
                                />
                            </div>
                        </div>
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Geziyi Bitirme:  </label>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={this.state.dateCompleted}
                                onChange={this.onChangeDateCompleted}
                            />
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="form-group">
                        <button onClick={this.onUpdateCancel} className="btn btn-default">İptal</button>
                        <button type="submit" className="btn btn-success">Güncelle</button>
                    </div>
                </form>
            </div>
        )
    }
}