import React from "react";
import Lchart from "./chartdemo";
import Header from "./header";
import Dash from "./dash";
import "./master.css";
import coindata from "./mockdata.json";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import json_data from "./mockdata2.json";

const Main = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["uToken"]);

  const [togglers, setToogler] = useState([]);

  const [activeTab, setActiveTab] = useState("0");
  const [chartType, setChartType] = useState("line");
  const [isLoading, setIsloading] = useState(false);

  const [oDuscisFinal, setODuscisFinal] = useState([]);
  const [ledgerNa, setLedgerNa] = useState([]);
  const [perfectMile, setPerfectMile] = useState([]);
  const [ledgerNaMetrics, setLedgerNaMetrics] = useState([]);
  const [amritaOutbound, setAmritaOutbound] = useState([]);

  const [sortedarr, setSortedArr] = useState([]);

  const [ogData, setOgData] = useState([]);

  useEffect(() => {
    setIsloading(true);

    const config = {
      headers: { "content-type": "application/json", Authorization: cookies.uToken },
    };

    Axios.post("http://127.0.0.1:8000/get-dataset_data", {}, config)
      .then((response) => {
        console.log(response.data);
        setOgData(response.data);
        setIsloading(false);
      })
      .catch(() => {
        setIsloading(false);
      });
  }, []);

  useEffect(() => {
    // Combine all arrays into a single array
    const combinedArray = ogData.slice().sort((a, b) => new Date(a.date) - new Date(b.date));

    // Update state for the sorted array
    setSortedArr(combinedArray);
  }, [ogData]);

  useEffect(() => {
    // Iterate through the JSON data and update state for each category
    ogData.forEach((item) => {
      switch (item.dataset) {
        case "O_DUSCIS_FINAL":
          setODuscisFinal((prevState) => [...prevState, item]);
          break;
        case "ledger_na":
          setLedgerNa((prevState) => [...prevState, item]);
          break;
        case "D_PERFECTMILE_PACKAGE_ITEMS_V2_NA":
          setPerfectMile((prevState) => [...prevState, item]);
          break;
        case "ledger_na_CUSTOMER_OUTBOUND_METRICS":
          setLedgerNaMetrics((prevState) => [...prevState, item]);
          break;
        case "AMRITA_OUTBOUND_CI_PACKAGE_NA":
          setAmritaOutbound((prevState) => [...prevState, item]);
          break;
        default:
          // Handle other cases if needed
          break;
      }
    });
  }, [ogData]);

  return (
    <>
      {isLoading && (
        <div style={{ height: "100vh", width: "100%" }} className="d-flex align-items-center">
          <div class="loader2 mx-auto"></div>
        </div>
      )}
      <div style={{ maxHeight: "90vh", overflowY: "scroll " }} data-aos="fade-up">
        {/* <div className="p-4 ">
          <div className="w-100 rounded-3 py-3">
            <h4 className="fs-2 mb-4 text-dark fw-bold">Workflows</h4>
         
            <div className=" d-flex align-items-center">
              <div data-aos="fade-right" data-aos-delay="200" className="card p-3 me-5 " style={{ width: "18rem" }}>
                <h6 className="card-subtitle text-muted"># Success Workflows </h6>
                <h3 className="fw-bold card-title text-info">{successWf}</h3>
              </div>

              <div data-aos="fade-right" data-aos-delay="400" className="card p-3 me-5 " style={{ width: "18rem" }}>
                <h6 className="card-subtitle text-muted"># Failed Workflows </h6>
                <h3 className="fw-bold card-title text-danger">{failedWf}</h3>
              </div>
            </div>
          </div>
        </div> */}

        <div className="px-3 pt-4">
          <div className="row mx-0 p-3 ps-0 pe-0 rounded" style={{ backgroundColor: "white" }}>
            <div className="col-12 d-flex">
              <div className="w-100   p-2" data-aos="fade-up">
                <div className="togglers w-100 d-flex align-items-center">
                  <div className="cToggles d-flex border border-1 border-light rounded-pill p-2 bg-light" style={{ width: "max-content" }}>
                    <button className={`rounded-pill btn ${chartType == "line" ? "btn-info text-light" : "btn-outline-info"}`} onClick={() => setChartType("line")}>
                      <i className="fa fa-line-chart rounded-circle"></i>
                    </button>
                    <button className={`rounded-pill btn ms-2 ${chartType == "bar" ? "btn-info text-light" : "btn-outline-info"}`} onClick={() => setChartType("bar")}>
                      <i className="fa fa-bar-chart"></i>
                    </button>
                  </div>
                </div>

                <Lchart
                  cdata={togglers}
                  cType={chartType}
                  sarr={sortedarr}
                  odf={oDuscisFinal}
                  lna={ledgerNa}
                  dppinav2={perfectMile}
                  lncom={ledgerNaMetrics}
                  aocipn={amritaOutbound}
                  origin={"workflows"}
                />
              </div>

              <div className="h-100 opacity-25" style={{ background: "rgb(183, 183, 185)" }}>
                <div className="vr"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
