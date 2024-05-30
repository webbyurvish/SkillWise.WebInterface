import axios from "axios";
import { useEffect, useState } from "react";

const Mentors = () => {
  const [mentors, setMentors] = useState<Array<object>>([]);

  const fetchMentors = async () => {
    const { data } = await axios.get("https://localhost:5001/api/mentor");

    if (data != null) {
      setMentors(data);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  console.log({ mentors });

  return <div>Mentors</div>;
};

export default Mentors;
