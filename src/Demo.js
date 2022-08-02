import React from 'react'
import Select from "react-select"
const Demo = () => {
    let games=[
        {value:"throwball",label:"throwball"},
        {value:"volleyball",label:"volleyball"},
        {value:"handball",label:"handball"}, 
      ]
  return (
    <Select
              required
              name="coach-games"
              id="coach-games"
              className="select"
              defaultValue=""
              isMulti
              options={games}
              isClearable={false}
              isSearchable={true}
              isDisabled={false}
              isLoading={false}
              isRtl={false}
              />
  )
}

export default Demo