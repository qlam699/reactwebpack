const api = () => {
    const host = "http://localhost:8888/api/v1"
    const errorMsg = { error: "Fail to load data" };

    const getAPI = async (currentAPI) => {
        try {
            const res = await fetch(`${host}/${currentAPI}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('Error: ', error);
            return errorMsg;
        }

    }

    const path = {
        mem: '/stats/mem',
        status: '/status',
        listener: '/listener',
        config: '/config'
    }

    return ({
        getMem: () => getAPI(path.mem),
        getStatus: () => getAPI(path.status),
        getListener: () => getAPI(path.listener),
        getConfig: () => getAPI(path.config),
        putListener: async (data) => {
            try {
                const res = await fetch(`${host}/${path.listener}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const data = await res.json();

            } catch (error) {
                console.log(error);
                return { error: true };
            }
        }
    })
}

module.exports = api();