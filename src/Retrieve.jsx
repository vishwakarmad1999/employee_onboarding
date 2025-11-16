import axios from "axios";
import { useEffect, useState } from "react";
import { fields } from "./utils";
import Pagination from "./Pagination";

const optionsMap = {};
for (const field of fields) {
  if (field.type === 'select') {
    for (const opt of field.options) {
      optionsMap[opt.value] = opt.text;
    }
  }
}

export default function Retrieve() {
    const [records, setRecords] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    async function fetchRecords(page=1) {
        const res = await axios.get(`/api/employees?page=${page}`)
        const { pageSize, total, rows } = res.data;
        setRecords(rows)
        setTotalPages(Math.ceil(total / pageSize));
    }

    function onPrevClick() {
      const newCurrentPage = Math.max(1, currentPage - 1);
      setCurrentPage(newCurrentPage)
      fetchRecords(newCurrentPage);
    }

    function onNextClick() {
      const newCurrentPage = Math.min(currentPage + 1, totalPages)
      setCurrentPage(newCurrentPage);
      fetchRecords(newCurrentPage);
    }

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
      <>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                {fields.map((col) => (
                  <th key={col.id}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.$id}>
                  {fields.map((col) => (
                    <td key={`${col.id}${record.$id}`}>
                      {col.type === "select"
                        ? optionsMap[record[col.id]]
                        : record[col.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        </div>
      </>
    );
}