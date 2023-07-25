// import React from 'react'
import { useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../helpers/axiosInstance';
import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd';
import { Row, Col } from 'antd';
import Bus from '../components/Bus';

function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const [buses, setBuses] = useState([]);
    const [filters = {}, setFilters] = useState({});


    const getBuses = async () => {
        const tempFilters = {};
        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                tempFilters[key] = filters[key];
            }
        })
        try {
            dispatch(ShowLoading());
            const response = await axiosInstance.post('/api/buses/get-all-buses', { filters: tempFilters });
            dispatch(HideLoading());

            if (response.data.success) {

                setBuses(response.data.data);
            }
            else {
                message.error(response.data.message);
            }
        }
        catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }


    };


    useEffect(() => {
        getBuses();

    }, []);

    return (
        <div>
            <div className='my-3 py-1'>
                <Row gutter={10} align='center'>
                    <Col lg={6} sm={24}>
                        <input type='text'
                            placeholder='From'
                            value={filters.from}
                            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                        />
                    </Col>

                    <Col lg={6} sm={24}>
                        <input type='text'
                            placeholder='To'
                            value={filters.to}
                            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                        />
                    </Col>

                    <Col lg={6} sm={24}>
                        <input type='date'
                            placeholder='Date'
                            value={filters.journeyDate}
                            onChange={(e) => setFilters({ ...filters, journeyDate: e.target.value })}
                        />
                    </Col>

                    <Col lg={6} sm={24}>
                        <div className='d-flex gap-2'>
                            <button className='primary-btn' onClick={() => getBuses()}>Filter</button>
                            <button className='outlined' onClick={() => setFilters({
                                from: "",
                                to: "",
                                journeyDate: "",
                            })}>
                                Clear</button>
                        </div>
                    </Col>


                </Row>
            </div>

            <div>
                <Row gutter={[15, 15]}>
                    {buses.filter((bus) => bus.status === "Yet To Start").map(bus => (
                        <Col lg={12} xs={24} sm={24}>
                            <Bus bus={bus} />
                        </Col>
                    ))}
                </Row>
            </div>


        </div>
    )
}

export default Home