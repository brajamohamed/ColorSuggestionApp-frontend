import React from "react";
import "./DashHome.css";
const DashHome = () => {
  return (
    <div className="">
      <h1 className="my-5">Get your dress color suggestion</h1>
      <div className="form">
        <form action="" className="d-flex flex-column gap-3">
          <div className="d-flex gap-3">
            <div className="input-group">
              <label htmlFor="" className="input-group-text app-input-label">
                Occassion
              </label>
              <select className="form-control" name="" id="">
                <option value="" disabled>
                  Select your occasion
                </option>
                <option value="office">Office</option>
                <option value="festival">Festival</option>
                <option value="familyFunction">Family Function</option>
                <option value="party">Party</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="" className="input-group-text app-input-label">
                Mood
              </label>
              <select className="form-control" name="" id="">
                <option value="">Formal</option>
                <option value="traditional">Traditional</option>
                <option value="chillout">Chill Out</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary border-0 rounded text-white p-2"
          >
            Get suggestion
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashHome;
