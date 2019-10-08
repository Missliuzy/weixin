/**
 * 字段说明
 *  title 显示标题
 *  className 区块className
 *  dataKey 查询返回整体参数
 *  dataType 单独查询类型；接口文档确定
 *  showListId 列表内容区分id
 *  showList 项目显示内容 label 名称，key 对应字段
 *  selectType 选择类型，type 2 单选。其他多选---单选时没有删除按钮
 */


export const conf = [
  {
    title: '求职意向',
    className: 'intent',
    dataKey: 'qzyx',
    dataType: '2',
    selectType: '2',
    showListId: 'qzyxid',
    showList: [
      {
        label: '期望职位',
        key: 'gwmc'
      },
      {
        label: '工作地区',
        key: 'qwjydd'
      },
      {
        label: '期望薪资',
        key: 'xc'
      }
    ]
  },
  {
    title: '工作经历',
    className: 'job',
    dataKey: 'gzjl',
    dataType: '3',
    showListId: 'gzjlid',
    selectType: '1',
    showList: [
      {
        label: '工作岗位',
        key: 'gzgw'
      },
      {
        label: '单位名称',
        key: 'dwmc'
      },
      {
        label: '月薪',
        key: 'xc'
      }
    ]
  },
  {
    title: '职业技能',
    className: 'skill',
    dataKey: 'zyjn',
    dataType: '4',
    selectType: '1',
    showListId: 'grjnid',
    showList: [
      {
        label: '技能名称',
        key: 'yyjnbm_xs'
      },
      {
        label: '技能等级',
        key: 'jsdj_xs'
      }
    ]
  },
  {
    title: '外语特长',
    className: 'language',
    dataKey: 'yy',
    dataType: '4',
    selectType: '1',
    showListId: 'grjnid',
    showList: [
      {
        label: '技能名称',
        key: 'yyjnbm_xs'
      },
      {
        label: '熟练程度',
        key: 'slcd_xs'
      }
    ]
  },
  {
    title: '计算机等级',
    className: 'compute',
    dataKey: 'jsj',
    dataType: '4',
    selectType: '1',
    showListId: 'grjnid',
    showList: [
      {
        label: '技能名称',
        key: 'yyjnbm_xs'
      }
    ]
  }
];

/* 其他信息显示项，label显示文本，显示字段key */
export const other = [
  {
    label: '是否特困',
    key: 'sftk'
  },
  {
    label: '是否4050人员',
    key: 'sf4050'
  },
  {
    label: '是否低保',
    key: 'sfdb'
  },
  {
    label: '是否农转非',
    key: 'sfnzf'
  },
  {
    label: '是否复员退伍',
    key: 'sffytw'
  },
  {
    label: '是否两劳释放',
    key: 'sfllsf'
  },
  {
    label: '是否外埠转入',
    key: 'sfwfzr'
  },
  {
    label: '是否人户分离',
    key: 'sfrhfl'
  },
  {
    label: '是否应届高校毕业生',
    key: 'sfyjgxbys'
  }
];

