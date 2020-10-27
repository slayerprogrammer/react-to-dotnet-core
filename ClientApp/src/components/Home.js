import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Gezi Kulubüne Holgeldin</h1>
        <p>Bu sayfada yapabileceklerin;</p>
        <ul>
          <li>Yeni Gezi Ekleme</li>
          <li>Güncelleme</li>
          <li>Silme</li>
          <li>Listeleme</li>
        </ul>
      </div>
    );
  }
}
