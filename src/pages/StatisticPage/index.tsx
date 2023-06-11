/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Column, Pie } from '@ant-design/plots';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectorAllStats, selectorGpaStats, selectorSchoolStats, selectorSkillStats } from 'redux/statistic/selectors';
import {
  actionGetStatsAll,
  actionGetStatsGpa,
  actionGetStatsSchool,
  actionGetStatsSkill,
} from 'redux/statistic/actions';
import { get, isEmpty, toNumber } from 'lodash';
import { Col, Row, TreeSelect } from 'antd';

const StatisticPage = () => {
  const dispatch = useAppDispatch();

  const allStats = useAppSelector(selectorAllStats);
  const gpaStats = useAppSelector(selectorGpaStats);
  const skillStats = useAppSelector(selectorSkillStats);
  const schoolStats = useAppSelector(selectorSchoolStats);

  const [value, setValue] = useState<string>();
  const [value1, setValue1] = useState<string>();
  const [dataStatsGpa, setDataStatGpa] = useState<any>([]);
  const [dataSkillStat, setDataSkillStat] = useState<any>([]);
  const [dataSchoolStat, setDataSchoolStat] = useState<any>([]);

  const onChangeSelect1 = async (value: string) => {
    if (value) {
      const payload = {
        school: value
      }
      await dispatch(actionGetStatsSchool(payload)).unwrap();
    } else {
      dispatch(actionGetStatsSchool({})).unwrap();
    }
    setValue1(value);
  };

  const onChangeSelect = async (newValue: string) => {
    if (newValue) {
      const arr = newValue.toString().split('@');
      const payload = {
        school: arr.length > 0 ? arr[0] : null,
        major: arr.length > 1 ? arr[1] : null,
      };
      await dispatch(actionGetStatsGpa(payload)).unwrap();
      await dispatch(actionGetStatsSkill(payload)).unwrap();
    } else {
      dispatch(actionGetStatsGpa({})).unwrap();
      dispatch(actionGetStatsSkill({})).unwrap();
    }
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(actionGetStatsAll()).unwrap();
    dispatch(actionGetStatsGpa({})).unwrap();
    dispatch(actionGetStatsSchool({})).unwrap();
    dispatch(actionGetStatsSkill({})).unwrap();
  }, [dispatch]);

  useEffect(() => {
    const gpas = !isEmpty(gpaStats)
      ? Object.keys(gpaStats).map((key) => {
          return {
            type: key,
            value: toNumber(gpaStats[key][0].count),
          };
        })
      : [];
    setDataStatGpa(gpas);

    const skills = !isEmpty(skillStats)
      ? Object.keys(skillStats).map((key) => {
          return {
            type: skillStats[key].skill_skill_name,
            value: toNumber(skillStats[key].count),
          };
        })
      : [];
    setDataSkillStat(skills);

    const schools =
      schoolStats && schoolStats.length
        ? schoolStats.map((school: any) => {
            return {
              type: get(school, 'account_school', '') ? get(school, 'account_school', '') : get(school, 'account_major', ''),
              value: toNumber(school.count),
            };
          })
        : [];
    setDataSchoolStat(schools);
  }, [skillStats, gpaStats, schoolStats]);

  const configPie = {
    appendPadding: 10,
    data: dataStatsGpa,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const brandColorSchool = '#00FEF6';
  const configSchool = {
    data: dataSchoolStat,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }: any) => {
      return brandColorSchool;
    },
    label: {
      content: (originData: any) => {
        const val = originData?.value;
        return val;
      },
      // offset: 10,
    },
    xAxis: {
      label: {
        // autoHide: true,
        autoRotate: false,
      },
    },
  };

  const brandColor = '#5B8FF9';
  const configSkill = {
    data: dataSkillStat,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    color: ({ type }: any) => {
      return brandColor;
    },
    label: {
      content: (originData: any) => {
        const val = originData?.value;
        return val;
      },
      // offset: 10,
    },
    xAxis: {
      label: {
        // autoHide: true,
        autoRotate: false,
      },
    },
  };

  const listSchools1 = !isEmpty(allStats)
    ? allStats?.schools.map((school: any) => {        
        return {
          value: school.school_name,
          title: school.school_name,
        };
      })
    : [];

  const listSchools = !isEmpty(allStats)
    ? allStats?.schools.map((school: any) => {
        const majorBySchool = [];
        for (const major of get(allStats, 'majors', {})) {
          if (major?.school_id === school.id) {
            majorBySchool.push({
              value: `${school.school_name}@${major.major_major_name}`,
              title: major.major_major_name,
            });
          }
        }
        return {
          value: school.school_name,
          title: school.school_name,
          children: majorBySchool,
        };
      })
    : [];

  return (
    <div>
      <Row className="flex flex-row justify-between mt-10">
        <Col xs={15}>
          <div className="mb-10 font-bold">Số sinh viên theo từng trường/ngành</div>
          <TreeSelect
            showSearch
            style={{ width: '50%' }}
            value={value1}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Chọn trường cần thống kê"
            allowClear
            // treeDefaultExpandAll
            onChange={onChangeSelect1}
            treeData={listSchools1}
          />
          <Column {...configSchool} />
        </Col>
        <Col span={24} className="mt-20 mb-10">
          <TreeSelect
            showSearch
            style={{ width: '50%' }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Chọn trường/ngành cần thống kê"
            allowClear
            // treeDefaultExpandAll
            onChange={onChangeSelect}
            treeData={listSchools}
          />
        </Col>
        <Col xs={15}>
          <div className="mb-10 font-bold">Số sinh viên theo các kỹ năng</div>
          <Column {...configSkill} />
        </Col>
        <Col xs={8}>
          <div className="mb-10 font-bold">Tỷ lệ sinh viên chia theo học lực</div>
          <Pie {...configPie} />
        </Col>
      </Row>
    </div>
  );
};

export default StatisticPage;
