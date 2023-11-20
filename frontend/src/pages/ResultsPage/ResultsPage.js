import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Modal,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from 'recharts';
import {fetchCharts} from "../../api/api";

function ResultsPage() {
  const location = useLocation();
  const [responseData, setResponseData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [lineData, setLineData] = useState();
  const [companyName, setCompanyName] = useState();

  const getWeekly = async (symbol, company) => {
    // let response = await axios.get(
    //   `https://cloud.iexapis.com/v1/stock/${symbol}/chart/1m?token=pk_31638584dd6c4c04a550a33b66e50c33`
    // );
    let response = await fetchCharts(symbol);
    setOpen(true);
    setLineData(response.data);
    setCompanyName(company + ' (' + symbol + ')');
  };

  const COLORS = [
    '#FF8042',
    '#21618C',
    '#F4D03F',
    '#0088FE',
    '#00C49F',
    '#FFBB28',
  ];

  useEffect(() => {
    const fetchData = () => {
      setResponseData(location.state.respData);
    };
    fetchData();
  }, [location]);

  return (
    <>
      <Box style={{ marginTop: '-1.7%' }}>
        <Modal open={open} onClose={handleClose}>
          <Box
            display="flex"
            flexDirection="column"
            border={1}
            borderRadius={2}
            width="70%"
            marginLeft={22}
            backgroundColor="white"
            p={4}
            marginTop="6.2%"
          >
            <Typography marginBottom={2}>{companyName}</Typography>
            <LineChart
              width={1000}
              height={400}
              data={lineData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label">
                <Label value="Date" offset={0} position="insideBottom" />
              </XAxis>
              <YAxis
                label={{ value: '$', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Line
                connectNulls={true}
                type="monotone"
                dataKey="close"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Line
                connectNulls={true}
                type="monotone"
                dataKey="open"
                stroke="rgb(11, 21, 26)"
                fill="#8884d8"
              />
            </LineChart>
            <Button
              variant="outlined"
              sx={{
                width: '5%',
                marginLeft: '91%',
              }}
              onClick={handleClose}
            >
              Ok
            </Button>
          </Box>
        </Modal>
        <Box>
          {responseData?.strategiesResponse && Object.entries(responseData.strategiesResponse).map(([strategy, strategyResponse]) =>
              (<Box
                  display="flex" flexDirection="column" marginTop={4}
                >
                    <Typography
                        textAlign="left"
                        marginLeft="3%"
                        fontSize={20}
                        marginBottom={0.5}
                        fontWeight="bold"
                        marginTop="1%"
                    >
                      {strategy}
                    </Typography>
                    {strategyResponse && strategyResponse.map((record) =>
                        <Box
                            display="flex"
                            flexDirection="column"
                            marginBottom={2}
                            sx={{ p: 2 }}
                        >
                          {record && record.map(item =>
                              <Card
                                  sx={{
                                    width: '30%',
                                    backgroundColor:
                                        item.change < 0 ? '#F44336' : '#2ECC71',
                                  }}
                              >
                                <CardActionArea
                                    onClick={() =>
                                        getWeekly(item.symbol, item.companyName)
                                    }
                                >
                                  <CardContent>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        marginBottom={1}
                                    >
                                      <Typography variant="h5">
                                        {item.companyName}
                                      </Typography>
                                      <Typography>{item.symbol}</Typography>
                                    </Box>
                                    <Typography textAlign="left">
                                      Latest Price: {item.latestPrice}
                                    </Typography>
                                    <Typography textAlign="left">
                                      Change: {item.change}
                                    </Typography>
                                    <Typography textAlign="left">
                                      Change Percent: {item.changePercent}
                                    </Typography>
                                    <Typography
                                        textAlign="right"
                                        sx={{ fontSize: '12px' }}
                                    >
                                      {item.latestTime}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                              </Card>

                          )}
                        </Box>
                      )}
                </Box>
              ))
          }
        </Box>
        <Typography
          textAlign="left"
          marginLeft="3%"
          fontSize={20}
          marginBottom={0.5}
          fontWeight="bold"
        >
          Pie Chart
        </Typography>
        <Box display="flex" justifyContent="space-evenly" sx={{ p: 2 }}>
          {responseData && responseData.piechartResponse ? (
            <PieChart width={700} height={400}>
              <Tooltip formatter={(value, name) => [value, name]} />
              <Pie
                data={responseData.piechartResponse}
                dataKey="value"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#3996E6"
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {responseData.piechartResponse[index].title}
                    </text>
                  );
                }}
              />
            </PieChart>
          ) : (
            ''
          )}
        </Box>
      </Box>
    </>
  );
}

export default ResultsPage;
