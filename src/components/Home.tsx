import { CleevioContext } from "../context/CleevioState_";
import { SingleTrip } from "./SingleTrip";
import { useContext, useEffect } from "react";
import FadeIn from "react-fade-in";
import Loading from "../imgs/Loading.gif";
import styled from "styled-components";

export const Home = () => {
  const context = useContext(CleevioContext);
  useEffect(() => {
    context.getCountries();
  }, []);
  return (
    <WrapperDiv>
      <PageName>Your trips</PageName>

      {context.loading ? (
        <LoadingDiv src={Loading} alt="" />
      ) : (
        context.trips.map((trip) => (
          <FadeIn key={trip.id}>
            <SingleTrip {...trip} />
          </FadeIn>
        ))
      )}

      {!context.loading && context.trips.length === 0
        ? "No data, add something"
        : null}
    </WrapperDiv>
  );
};

type ContainerType = {
  padding?: string;
};
export const PageName = styled.h2<ContainerType>`
  padding: ${(props) => (props.padding ? "1rem 2rem" : "none")};
  padding-bottom: 2.3rem;
  border-bottom: 1px solid #f1f1f2;
  text-align: left !important;
  align-items: flex-start;
`;

export const WrapperDiv = styled.div`
  grid-area: main;
  padding: 1rem 2rem;
`;
export const LoadingDiv = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
