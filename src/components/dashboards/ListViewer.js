import React, { Fragment } from "react";

function dataFixer(obj, deleted) {
  deleted.forEach(item => {
    delete obj.original[item];
  });
  return obj.original;
}

function ListViewer(props) {
  const data = dataFixer(props.data, props.removedData);
  const list = Object.entries(data).map(([key, value]) => (
    <Fragment>
      {key === "logo" || key === "_id" ? null : <h1>{key}</h1>}
      {key === "logo" ? (
        <div>
          <img alt={key} src={"https://api-mobilar.wereact.co/" + value} />
        </div>
      ) : (
        <>{key === "_id" ? null : <p>{value}</p>}</>
      )}
    </Fragment>
  ));
  return list;
}

export default ListViewer;
