import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, Outlet, Location } from "react-router-dom";

const Dash = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["uToken"]);

  const [activeRepo, setActiveRepo] = useState([]);

  const categories = ["Ansible Collections", "Terraform Provider", "SDKs"];

  const [cpage, setCpage] = useState("main");
  // useEffect(() => {
  //   if (window.location.pathname == "/main" && cpage !== "main") {
  //     setCpage("main");
  //   } else if (window.location.pathname == "/add-repo" && cpage !== "pr") {
  //     setCpage("pr");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!cookies.uToken) {
  //     window.location.href = "/";
  //   }
  // }, []);

  // useEffect(() => {
  //   const config = {
  //     headers: { "content-type": "application/json", Authorization: cookies.uToken },
  //   };

  //   Axios.post("http://127.0.0.1:8000/get-all-repos", {}, config)
  //     .then((response) => {
  //       console.log(response.data.repos);
  //       setActiveRepo(response.data.repos);
  //       props.activerep(response.data.repos[0]);
  //       // setIsloading(false);
  //     })
  //     .catch(() => {
  //       // setIsloading(false);
  //     });
  // }, []);

  return (
    <>
      <div className="maincs w-100 " data-aos="fade-up" data-aos-delay="100">
        <div className="d-flex flex-column flex-shrink-0 p-3 w-100" style={{ width: "100%", background: "white" }}>
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
            <span className="fs-4 fw-bold">LOGO</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item text-dark">
              <Link to="/" style={{ fontSize: "15px" }} className={`nav-link text-dark ${cpage == "main" ? "active" : ""}`} onClick={() => setCpage("main")}>
                <i className="fa fa-home fs-6 pe-3"></i> Home
              </Link>
            </li>
            {/* <li>
              <Link to="/add-repo" style={{ fontSize: "15px" }} className={`nav-link text-dark ${cpage == "pr" ? "active" : ""}`} onClick={() => setCpage("pr")}>
                <i className="fa fa-tachometer fs-6 pe-3"></i> Admin
              </Link>
            </li>

            <li class="nav-item dropdown" data-bs-auto-close="outside">
              <a
                class="nav-link dropdown-toggle text-dark"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "15px" }}
                data-bs-auto-close="outside"
              >
                <i className="fa fa-list fs-6 pe-3"></i> Repositories
              </a>
              <ul class="dropdown-menu px-1" aria-labelledby="navbarDropdown" style={{ overflowY: "scroll", height: "300px", width: "100%" }} data-bs-auto-close="outside">
                {activeRepo &&
                  activeRepo.map((ini) => {
                    return (
                      <li class="nav-item dropdown" data-bs-auto-close="outside">
                        <a
                          class={`nav-link dropdown-toggle text-dark  ${ini.repo_id == props.isactive.repo_id ? "active text-info" : ""}`}
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ fontSize: "15px" }}
                          data-bs-auto-close="outside"
                        >
                          {ini.name}
                        </a>
                        <ul class="dropdown-menu px-1 bg-light" aria-labelledby="navbarDropdown" style={{ overflowY: "scroll", height: "300px", width: "100%" }}>
                          <li class="nav-item dropdown" data-bs-auto-close="outside">
                            <a
                              class={`nav-link dropdown-toggle text-dark  ${ini.repo_id == props.isactive.repo_id ? "active text-info" : ""}`}
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ fontSize: "15px" }}
                              data-bs-auto-close="outside"
                            >
                              {ini.category}
                            </a>
                            <ul class="dropdown-menu px-1 bg-muted" aria-labelledby="navbarDropdown" style={{ overflowY: "scroll", height: "150px", width: "100%" }} data-bs-auto-close="outside">
                              <li onClick={() => props.activerep(ini)}>
                                <a class={`dropdown-item ${ini.repo_id == props.isactive.repo_id ? "active text-info" : ""}`} role="button">
                                  {ini.sub_category}
                                </a>
                              </li>
                            </ul>
                          </li>

                          {categories.map((jini) => {
                            if (jini !== ini.category) {
                              return (
                                <li class="nav-item " data-bs-auto-close="outside">
                                  <a class={`nav-link  dropdown-toggle   text-muted`} href="#" style={{ fontSize: "15px" }}>
                                    {jini}
                                  </a>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </li>
                    );
                  })}
              </ul>
            </li>
            <li>
              <a href="#" style={{ fontSize: "15px" }} className="nav-link text-dark">
                <i className="fa fa-users fs-6 pe-3"></i> Users
              </a>
            </li> */}
          </ul>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dash;
