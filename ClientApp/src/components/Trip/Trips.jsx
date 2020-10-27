import React, {Component} from 'react';
import axios from 'axios';
export class Trips extends Component
{
    constructor(props){
        super(props);

        this.onTripUpdate = this.onTripUpdate.bind(this);
        this.onTripDelete = this.onTripDelete.bind(this);

        this.state = {
            trips: [],
            loading: true,
            failed: false,
            error: ''
        }
    }

    componentDidMount(){
        this.populateTripsData();
    }

    onTripUpdate(id){
        const {history} = this.props;
        history.push('/update/'+id);
    }

    onTripDelete(id){
        const {history} = this.props;
        history.push('/delete/'+id);
    }

    populateTripsData(){
        axios.get("api/Trips/GetTrips").then(result => {
            const response = result.data;
            this.setState({trips: response, loading: false, failed: false, error:""});
        }).catch(error => {
            this.setState({trips: [], loading: false, failed: true, error:"Trips could not be loaded"});
        });
    }

    renderAllTripsTable(trips){
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Gezi Adı</th>
                        <th>Açıklama</th>
                        <th>Başlama</th>
                        <th>Bitirme</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trips.map(trip => (
                        <tr key={trip.id}>
                            <td>{trip.name}</td>
                            <td>{trip.description}</td>
                            <td>{new Date(trip.dateStarted).toISOString().slice(0,10)}</td>
                            <td>{trip.dateCompleted ? new Date(trip.dateCompleted).toISOString().slice(0,10) :  '-' }</td>
                            <td>
                                <div className="form-group">
                                    <button onClick={() => this.onTripUpdate(trip.id)} className="btn btn-success">
                                        Güncelle
                                    </button>
                                    <button onClick={() => this.onTripDelete(trip.id)} className="btn btn-danger">
                                        Sil
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        );
    }

    render(){

        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : ( this.state.failed ? (
            <div className="text-danger">
                <em>{this.state.error}</em>
            </div>
        ) : (
            this.renderAllTripsTable(this.state.trips))
        )

        return (
            <div>
                <h1>Tüm Geziler</h1>
                <p>Tüm Gezileri Görüyorsun İşte..</p>
                {content}
            </div>
        );
    }
}