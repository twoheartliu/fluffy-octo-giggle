import Mock from 'mockjs'
// webpack 会默认暴露：图片、json 文件
import banner from './banner.json'
import floor from './floor.json'

Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
