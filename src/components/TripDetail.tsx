import { CleevioContext } from "../context/CleevioState_";
import { PageName } from "./Home";
import { config } from "../context/config";
import Loading from "../imgs/Loading.gif";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
type Provider = {
  connected: boolean;
  address: {
    city: string;
    country: string;
    street_num: undefined;
    street: string;
    zip: string;
  };
  end_date: string;
  start_date: string;
  covid: boolean;
  covid_test_date: string;
};
export default function TripDetail(props) {
  const [localData, setLocalData] = useState<Provider>();
  const { loading, setLoading, handleDelete, error, setError } =
    useContext(CleevioContext);
  const getId = props.match.params.id;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://task-devel.cleevio-vercel.vercel.app/api/trip/${getId}`,
        config
      );
      setLocalData(response.data);
      setLoading(false);
    } catch (error) {
      let errorMessage = "Failed to fetch";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }
  };
  return (
    <TripDiv>
      <PageName>Trip Detail</PageName>
      {error ? (
        error
      ) : (
        <div>
          <button
            onClick={() => handleDelete(getId, props)}
            disabled={loading ? true : false}
            style={{
              width: "100px",
              flexDirection: "column",
              position: "relative",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <img
                src={Loading}
                style={{
                  width: "20px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                alt="loading"
              />
            ) : (
              <p style={{}}>Delete</p>
            )}
          </button>
          {!localData ? (
            "Loading..."
          ) : (
            <div>
              <p>CITY: {localData.address.city}</p>
              <p>COUNTRY: {localData.address.country}</p>
              <p>STREET: {localData.address.street}</p>
              <p>STREET NUM: {localData.address.street_num}</p>
              <p>ZIP: {localData.address.zip}</p>
              <br />

              <p>END DATE: {localData.end_date}</p>
              <p> START DATE: {localData.start_date}</p>
              <br />
              <p>COVID: {localData.covid}</p>
              <p>{localData.covid_test_date}</p>
            </div>
          )}
        </div>
      )}
    </TripDiv>
  );
}

const TripDiv = styled.div`
  padding: 1rem 2rem;
`;