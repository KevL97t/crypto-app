import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  

  useEffect(()=>{

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);

  }, [cryptosList, searchTerm])

  if(isFetching) return 'loading...';

  return (
    <>
    {!simplified && (
      <div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" onChange={(e)=> setSearchTerm(e.target.value)}/>
    </div>
    )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos && console.log(cryptos)}
        {cryptos && cryptos.map((item) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={item.rank}>
            <Link to={`/crypto/${item.uuid}`}>
              <Card
                title={`${item.rank}. ${item.name}`}
                extra={<img className="crypto-image" src={item.iconUrl}/>}
                hoverable
              >
                <p>Price: {millify(item.price)}$</p>
                <p>Market Cap: {millify(item.marketCap)}</p>
                <p>Daily change: {millify(item.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
