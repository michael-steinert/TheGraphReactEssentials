import "./App.css";
import {createClient} from "urql";
import {useEffect, useState} from "react";

/* MakerDAO Governance Query (HTTP) */
const theGraphUrl = "https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance";

const theGraphQuery = `
{
  voterRegistries(first: 5) {
    id
    coldAddress
    hotAddress
    voteProxies {
      id
    }
  }
  voteProxies(first: 5) {
    id
    locked
    owner {
      id
    }
    votedSlate {
      id
    }
  }
}
`;

const client = createClient({
    url: theGraphUrl
});

function App() {
    const [voterRegistries, setVoterRegistries] = useState(null);
    const fetchDataFromTheGraph = async() => {
        const response = await client.query(theGraphQuery).toPromise().catch(error => console.error());
        setVoterRegistries(response.data.voterRegistries);
    }

    useEffect(()=> {
        fetchDataFromTheGraph().catch(error => console.error());
    },[])

    return (
        <div className={"App"}>
            {
                voterRegistries?.map((voterRegistry, index) => (
                    <div key={index}>
                        <p>
                            ID: ${voterRegistry.id}, coldAddress: ${voterRegistry.coldAddress}, hotAddress: ${voterRegistry.hotAddress}
                        </p>
                    </div>
                ))
            }
        </div>
    );
}

export default App;
