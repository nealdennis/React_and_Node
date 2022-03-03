import React from "react";

function App() {
    React.useEffect(() => {
        fetch("/api").then((res) => res.json()).then((data) => {
            fetch("http://localhost:8080/logon.i4?LoginWebserviceId=" + data.token).then((response) => {
                var newScript = document.createElement("script");
                newScript.defer = true;
                document.head.appendChild(newScript);
                newScript.src = "http://localhost:8080/JsAPI/v3";
                setTimeout(() => window.yellowfin.init().then(() => {
                    window.yellowfin.loadDashboard({
                        dashboardUUID: 'de35f619-09fc-4733-97cd-d47f23b13cc3',
                        element: document.querySelector('div#App'),
                    })
                }), 100);
            })
        });
    }, []);
    return ( 
        <div id = "App"className = "App" >
        </div>
    );
}
export default App;