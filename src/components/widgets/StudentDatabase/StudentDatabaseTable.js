//dependencies
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { EditContext } from "../../../Context/EditContext";

//components
import SearchBar from "../SearchBar";

//css
import "../Table.css";
import "../StudentDatabase/StudentDatabaseFilter.css";

//code
const StudentDatabaseTable = () => {
  //states
  let [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);
  const [tempData, setTempData] = useState([]);
  const razorpayLink = "https://dashboard.razorpay.com/signin?screen=sign_in";
  //handlers

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "students"), (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setTempData(list);
        dispatch({ type: "CLICKED" });
        return;
      });
      return () => {
        unsub();
      };
    };
    fetchData();
  }, [dispatch]);

  //editredux
  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  //filters

  //searchfilter
  const filterHandler = async (value) => {
    if (value.length > 0) {
      const q = query(
        collection(db, "students"),
        where("searchKeywords", "array-contains", value)
      );
      const snap = await getDocs(q);
      console.log(snap);
      const newData = [];
      snap.docs.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    }
    if (value.length <= 0) {
      setData(tempData);
    }
  };

  //status filter
  const statusFilterHandler = async (value) => {
    if (value === "all") {
      setData(tempData);
    } else {
      const q = query(
        collection(db, "students"),
        where("student-status", "==", value)
      );
      const snap = await getDocs(q);
      console.log(snap);
      const newData = [];
      snap.docs.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    }
  };

  //blood group fiter handler

  const bloodGroupFilterHandler = async (value) => {
    if (value === "all") {
      setData(tempData);
    } else {
      const q = query(
        collection(db, "students"),
        where("student-blood-group", "==", value)
      );
      const snap = await getDocs(q);
      console.log(snap);
      const newData = [];
      snap.docs.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    }
  };

  const genderFilterHandler = async (value) => {
    if (value === "all") {
      setData(tempData);
    } else {
      const q = query(
        collection(db, "students"),
        where("student-gender", "==", value)
      );
      const snap = await getDocs(q);
      console.log(snap);
      const newData = [];
      snap.docs.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    }
  };

  //feesfilter
  const feesFilterHandler = async (value) => {
    if (value === "all") {
      setData(tempData);
    } else if (value === "paid") {
      const time = new Date();
      const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        time
      );
      const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
        time
      );
      const date = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
        time
      );
      let d = `${year}-${month}-${date}`;
      console.log(d);
      const q = query(
        collection(db, "students"),
        where("student-fees-renewal", ">=", d)
      );
      const snap = await getDocs(q);
      console.log(snap);
      const newData = [];
      snap.docs.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    } else {
      const time = new Date();
      const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        time
      );
      const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
        time
      );
      const date = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
        time
      );
      console.log("pending");
      let d = `${year}-${month}-${date}`;
      console.log(d);
      const q = query(
        collection(db, "students"),
        where("student-fees-renewal", "<=", d)
      );
      const snap = await getDocs(q);
      console.log(snap);
      const newData = [];
      snap.docs.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    }
  };

  return (
    <>
      {/* seachbar */}
      <SearchBar
        placeholder="Search..."
        setValue={(value) => filterHandler(value)}
      />
      {/* displaydata */}
      <div className="student-database-filter-container mt-5 ms-5">
        <div className="student-database-filter-container-row row">
          <div className="col-xs-6 col-12">
            {/* check payment */}
            <span className="student-database-filter-name ms-3">
              Check payments
            </span>
            <a
              className="ms-2 me-4"
              href={razorpayLink}
              target={"_blank"}
              rel="noreferrer"
            >
              <button className="btn payment-dashboard-btn "></button>
            </a>

            {/* feesfilter */}
            <span className="student-database-filter-name">Sort by fees</span>
            <select
              name="feesFilter"
              id="feesFilter"
              className="student-database-filter-input ms-2 me-3"
              onChange={(e) => {
                feesFilterHandler(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>

            {/* statusfilter */}
            <span className="student-database-filter-name ms-3">
              Sort by status
            </span>
            <select
              name="statusFilter"
              id="statusFilter"
              className="student-database-filter-input ms-2"
              onChange={(e) => {
                statusFilterHandler(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>

            {/* blood group filter */}
            <span className="student-database-filter-name ms-3">
              Sort by blood group
            </span>
            <select
              name="bloodGroupFilter"
              id="bloodGroupFilter"
              className="student-database-filter-input ms-2"
              onChange={(e) => {
                bloodGroupFilterHandler(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="A+ve">A+ve</option>
              <option value="A-ve">A-ve</option>
              <option value="A1+ve">A1+ve</option>
              <option value="A1-ve">A1-ve</option>
              <option value="A1B+ve">A1B+ve</option>
              <option value="A1B-ve">A1B-ve</option>
              <option value="A2+ve">A2+ve</option>
              <option value="A2-ve">A2-ve</option>
              <option value="A2B+ve">A2B+ve</option>
              <option value="A2B-ve">A2B-ve</option>
              <option value="AB+ve">AB+ve</option>
              <option value="AB-ve">AB-ve</option>
              <option value="B+ve">B+ve</option>
              <option value="B-ve">B-ve</option>
              <option value="Bombay Blood Group">Bombay Blood Group</option>
              <option value="INRA">INRA</option>
              <option value="O+ve">O+ve</option>
              <option value="O-ve">O-ve</option>
            </select>

            {/* gender filter */}
            <span className="student-database-filter-name ms-3">
              Sort by gender
            </span>
            <select
              name="bloodGroupFilter"
              id="bloodGroupFilter"
              className="student-database-filter-input ms-2"
              onChange={(e) => {
                genderFilterHandler(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="trans">Trans</option>
            </select>
          </div>
        </div>
      </div>

      <div className="student-database-table-container mt-5">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Renewal Date</th>
              <th scope="col">Status</th>
              <th scope="col">Game</th>
              <th scope="col">Gender</th>
              <th scope="col">Blood Group</th>
              <th scope="col">DOB</th>
              <th scope="col">Parent's Contact</th>
              <th scope="col">Other health issues</th>
            </tr>
          </thead>
          {data
            .slice(0)
            .reverse()
            .map((d) => {
              return (
                <tbody key={d.timeStamp}>
                  <tr className="table-row">
                    <td>
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#modal-fullscreen-xl"
                        data-bs-toggle="modal"
                        data-bs-target="#addEditModal"
                        onClick={() => EditHandler(d.id)}
                      >
                        <i className="table-edit-icon fa-solid fa-pen"></i>
                      </a>
                    </td>

                    <td>{d["studentId"]}</td>
                    <td>{d["student-name"]}</td>
                    <td>{d["student-contact"]}</td>
                    <td>{d["student-fees-renewal"]}</td>
                    <td>{d["student-status"]}</td>
                    <td>{d["student-games"]}</td>
                    <td>{d["student-gender"]}</td>
                    <td>{d["student-blood-group"]}</td>
                    <td>{d["student-dob"]}</td>
                    <td>{d["student-parent-contact"]}</td>
                    <td>{d["student-health-issues"]}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default StudentDatabaseTable;
