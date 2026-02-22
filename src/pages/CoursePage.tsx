import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Paper, Divider, List, ListItem, ListItemText, ListItemButton, Collapse, IconButton, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// 课程章节类型定义
interface CourseSection {
  id: string;
  title: string;
  description?: string;
  lessons: {
    id: string;
    title: string;
  }[];
}

const CoursePage: React.FC = () => {
  // 课程信息
  const courseInfo = {
    title: 'Web Information Metrology and Evaluation',
    university: 'Beijing Normal University',
    description: 'Do you know about big data? Do you know about the Internet? Do you know how to effectively analyze, evaluate and utilize Internet big data? ... If you are interested in such questions, please join the "Web Information Metrology and Evaluation" MOOC class! We will show you the beauty of network big data, master the theory, methods and applications of webometrics, familiarize yourself with the usage of seven major network databases, and learn ten most popular network information analysis software!',
    instructor: 'Course Team',
    createTime: '2024-01-01',
    tags: ['Big Data', 'Web Metrology', 'Information Analysis', 'MOOC']
  };

  // 课程章节数据
  const courseSections: CourseSection[] = [
    {
      id: '1',
      title: 'Webometrics in the Big Data Era',
      description: 'Understand the course overview and learning suggestions, big data era background, current status and future development of webometrics.',
      lessons: [
        { id: '1.1', title: 'Lecture Introduction' },
        { id: '1.2', title: 'Course Introduction' },
        { id: '1.3', title: 'Big Data Foundation' },
        { id: '1.4', title: 'Webometrics Foundation' },
        { id: '1.5', title: 'Webometrics Development' },
        { id: '1.6', title: 'Lecture Summary' }
      ]
    },
    {
      id: '2',
      title: 'How Much Do You Know About Web Information',
      description: 'Understand the overview of network information resources and efficient search skills, master the retrieval skills and methods of authoritative Chinese and English databases such as CNKI, CSSCI, WoS, and improve the ability to obtain network information resources.',
      lessons: [
        { id: '2.1', title: 'Lecture Introduction' },
        { id: '2.2', title: 'Talking About the Internet' },
        { id: '2.3', title: 'Search Skills Guide' },
        { id: '2.4', title: 'How to Become an Internet Gold Digger' },
        { id: '2.5', title: 'CNKI - The Essential Chinese Resource Database' },
        { id: '2.6', title: 'CSSCI - Finding Top Social Science Journals' },
        { id: '2.7', title: 'CSCD - The Most Authoritative Chinese Science Citation Database' },
        { id: '2.8', title: 'WoS - The World\'s Core Journal Citation Index' },
        { id: '2.9', title: 'Scopus - The World\'s Largest Citation Database' },
        { id: '2.10', title: 'CiteSeerX - Literature Database for IT Enthusiasts' },
        { id: '2.11', title: 'Google Scholar - Standing on the Shoulders of Giants for Free' },
        { id: '2.12', title: 'Lecture Summary' }
      ]
    },
    {
      id: '3',
      title: 'Web Information Speaks',
      description: 'Understand the basics of web log analysis, web link analysis, web citation analysis and social network analysis methods, and be able to use the learned knowledge to analyze actual cases and explore network data value.',
      lessons: [
        { id: '3.1', title: 'Lecture Introduction' },
        { id: '3.2', title: 'Web Log Analysis to Peek into User Behavior' }
        // Other lessons omitted
      ]
    }
  ];

  // 展开状态管理
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // 切换章节展开/折叠状态
  const handleSectionToggle = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId) 
        : [...prev, sectionId]
    );
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* 课程标题 */}
      <Typography variant="h4" component="h1" gutterBottom>
        {courseInfo.title}
      </Typography>
      
      {/* 课程标签 */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {courseInfo.tags.map((tag, index) => (
          <Chip key={index} label={tag} color="primary" variant="outlined" />
        ))}
      </Box>

      {/* 课程卡片 */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Course Overview
        </Typography>
        <Typography paragraph>
          {courseInfo.description}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              University
            </Typography>
            <Typography>{courseInfo.university}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Instructor
            </Typography>
            <Typography>{courseInfo.instructor}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Creation Time
            </Typography>
            <Typography>{courseInfo.createTime}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* 课程章节 */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Course Outline
        </Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {courseSections.map((section) => (
            <React.Fragment key={section.id}>
              <ListItemButton onClick={() => handleSectionToggle(section.id)}>
                <ListItemText 
                  primary={section.title} 
                  secondary={section.description}
                />
                {expandedSections.includes(section.id) ? (
                  <IconButton edge="end" aria-label="collapse">
                    <ExpandLessIcon />
                  </IconButton>
                ) : (
                  <IconButton edge="end" aria-label="expand">
                    <ExpandMoreIcon />
                  </IconButton>
                )}
              </ListItemButton>
              <Collapse 
                in={expandedSections.includes(section.id)} 
                timeout="auto" 
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {section.lessons.map((lesson) => (
                    <ListItem key={lesson.id} sx={{ pl: 4 }}>
                      <ListItemText 
                        primary={lesson.title} 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default CoursePage;