const axios = require('axios');


const getAllMetrics = async () => {
    const serverurl = `${process.env.SONARQUBE_SERVER_URL}/api/metrics/search`
    const response = await axios.get(serverurl,
        {
            headers: { 'Authorization': `${process.env.SONARQUBE_SERVER_TOKEN}` }
        }

    );
    const metrics = response.data.metrics;
    return metrics.map(metric => metric.key);
};

const getComponentMeasures = async (req, res) => {
    const {componentKey} = req.body;
    if (!componentKey) {
        return res.status(400).json({ error: 'componentKey is required' });
    }
    const metricKeys = await getAllMetrics();
    const metricsQueryString = metricKeys.join(',');
    const serverurl = `${process.env.SONARQUBE_SERVER_URL}/api/measures/component`


    const response = await axios.get(serverurl, {
        params: {
            component: componentKey,
            metricKeys: 'coverage,bugs,vulnerabilities,code_smells,lines,file_complexity,duplicated_lines_density,security_rating,reliability_rating,major_violations,ncloc_language_distribution,complexity,development_cost,files'
        },
        headers: { 'Authorization': `${process.env.SONARQUBE_SERVER_TOKEN}` }
    });
    const resData = response.data

    return res.status(200).json({ message: 'SonarQube analysis completed.', report: resData});
};

module.exports = getComponentMeasures;