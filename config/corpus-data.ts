export interface CorpusItem {
  text: string
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  keywords?: string[]
  explanation?: string
  tags?: string[]
}

export interface CorpusModel {
  id: string
  name: string
  description: string
  icon: string
  color: string
  items: CorpusItem[]
}

export const corpusModels: CorpusModel[] = [
  {
    id: 'classical',
    name: '古文',
    description: '感受古典文学的韵律之美',
    icon: '📜',
    color: 'amber',
    items: [
      // 经典诗词
      { text: '学而时习之，不亦说乎？', category: '论语', difficulty: 'easy', keywords: ['学习', '温习'], explanation: '学了又时常温习和练习，不是很愉快吗？', tags: ['论语', '教育'] },
      { text: '海内存知己，天涯若比邻。', category: '唐诗', difficulty: 'medium', keywords: ['友谊', '距离'], explanation: '四海之内有知心朋友，即使远在天边，也感觉像邻居一样近。', tags: ['王勃', '友情'] },
      { text: '会当凌绝顶，一览众山小。', category: '唐诗', difficulty: 'medium', keywords: ['登高', '志向'], explanation: '定要登上泰山最高峰，俯视群山，看起来都很小。', tags: ['杜甫', '抱负'] },
      { text: '春眠不觉晓，处处闻啼鸟。', category: '唐诗', difficulty: 'easy', keywords: ['春天', '睡觉'], explanation: '春日里贪睡不知不觉天已破晓，到处都是鸟儿清脆的叫声。', tags: ['孟浩然', '春景'] },
      { text: '少壮不努力，老大徒伤悲。', category: '乐府诗', difficulty: 'easy', keywords: ['努力', '青春'], explanation: '年轻时不努力学习，到老了只能白白地悲伤了。', tags: ['励志', '青春'] },
      { text: '桃花潭水深千尺，不及汪伦送我情。', category: '唐诗', difficulty: 'medium', keywords: ['友情', '深情'], explanation: '桃花潭的水深千尺，也比不上汪伦送别我的情谊深厚。', tags: ['李白', '友情'] },
      { text: '山重水复疑无路，柳暗花明又一村。', category: '宋诗', difficulty: 'hard', keywords: ['困境', '希望'], explanation: '山峦重叠水流曲折正担心无路可走，柳绿花艳忽然眼前又出现一个山村。', tags: ['陆游', '哲理'] },
      { text: '知之者不如好之者，好之者不如乐之者。', category: '论语', difficulty: 'medium', keywords: ['学习', '兴趣'], explanation: '知道学习的人不如喜爱学习的人，喜爱学习的人不如以学习为乐的人。', tags: ['孔子', '教育'] },
      { text: '落红不是无情物，化作春泥更护花。', category: '近代诗', difficulty: 'hard', keywords: ['奉献', '生命'], explanation: '从枝头上掉下来的花朵不是无情之物，它化成了春天的泥土，还要哺育美丽的春花。', tags: ['龚自珍', '奉献'] },
      { text: '路漫漫其修远兮，吾将上下而求索。', category: '楚辞', difficulty: 'hard', keywords: ['求索', '坚持'], explanation: '前面的道路啊又远又长，我将要上上下下地寻求探索。', tags: ['屈原', '求索'] },

      // 成语典故
      { text: '温故而知新，可以为师矣。', category: '论语', difficulty: 'medium', keywords: ['学习', '复习'], explanation: '温习旧的知识，进而懂得新的知识，这样的人可以成为老师了。', tags: ['教育', '方法'] },
      { text: '己所不欲，勿施于人。', category: '论语', difficulty: 'easy', keywords: ['待人', '道德'], explanation: '自己不愿意的事，不要强加给别人。', tags: ['道德', '处世'] },
      { text: '三人行，必有我师焉。', category: '论语', difficulty: 'easy', keywords: ['学习', '谦虚'], explanation: '三个人一起走路，其中必定有人可以当我的老师。', tags: ['谦虚', '学习'] },
      { text: '岂能尽如人意，但求无愧于心。', category: '格言', difficulty: 'medium', keywords: ['心境', '处世'], explanation: '怎么能够样样都如人意，只求做事无愧于心就行了。', tags: ['心境', '人生'] },
      { text: '宝剑锋从磨砺出，梅花香自苦寒来。', category: '格言', difficulty: 'medium', keywords: ['磨练', '坚持'], explanation: '宝剑的锋利来自不断的磨砺，梅花的清香来自它度过了寒冷的冬季。', tags: ['励志', '坚持'] },

      // 四季诗词
      { text: '春风又绿江南岸，明月何时照我还？', category: '宋诗', difficulty: 'medium', keywords: ['春天', '思乡'], explanation: '温和的春风又吹绿了江南岸边的野草，明月什么时候照着我回到家乡？', tags: ['王安石', '思乡'] },
      { text: '小荷才露尖尖角，早有蜻蜓立上头。', category: '宋诗', difficulty: 'easy', keywords: ['夏天', '荷花'], explanation: '小荷花刚刚伸出尖尖的角，就有一只小蜻蜓立在它的上头。', tags: ['杨万里', '夏景'] },
      { text: '停车坐爱枫林晚，霜叶红于二月花。', category: '唐诗', difficulty: 'medium', keywords: ['秋天', '枫叶'], explanation: '停下车来，是因为喜爱这深秋枫林晚景。霜染的枫叶胜过二月的鲜花。', tags: ['杜牧', '秋景'] },
      { text: '忽如一夜春风来，千树万树梨花开。', category: '唐诗', difficulty: 'medium', keywords: ['冬天', '雪景'], explanation: '仿佛一夜之间春风吹来，千树万树好像梨花盛开。', tags: ['岑参', '雪景'] },

      // 哲理名言
      { text: '不积跬步，无以至千里。', category: '荀子', difficulty: 'medium', keywords: ['积累', '坚持'], explanation: '不积累一步半步的行程，就没有办法达到千里之远。', tags: ['坚持', '积累'] },
      { text: '千里之行，始于足下。', category: '老子', difficulty: 'easy', keywords: ['开始', '行动'], explanation: '千里的远行，从脚下开始。', tags: ['行动', '开始'] },
      { text: '勿以恶小而为之，勿以善小而不为。', category: '三国志', difficulty: 'medium', keywords: ['道德', '行为'], explanation: '不要因为是件较小的坏事就去做，不要因为是件较小的善事就不去做。', tags: ['道德', '品格'] },
      { text: '书山有路勤为径，学海无涯苦作舟。', category: '格言', difficulty: 'medium', keywords: ['学习', '勤奋'], explanation: '在读书学习的道路上，没有捷径可走，要想在广博的书山、学海中汲取更多更广的知识，"勤奋"和"刻苦"是必不可少的。', tags: ['学习', '勤奋'] },

      // 励志诗句
      { text: '长风破浪会有时，直挂云帆济沧海。', category: '唐诗', difficulty: 'hard', keywords: ['志向', '坚持'], explanation: '相信总有一天，能乘长风破万里浪，高高挂起云帆，在沧海上勇往直前。', tags: ['李白', '励志'] },
      { text: '山不厌高，海不厌深。', category: '短歌行', difficulty: 'medium', keywords: ['包容', '胸怀'], explanation: '高山不辞土石才见巍峨，大海不弃涓流才见壮阔。', tags: ['曹操', '胸怀'] },
      { text: '天生我材必有用，千金散尽还复来。', category: '唐诗', difficulty: 'medium', keywords: ['自信', '乐观'], explanation: '上天造就了我的才干就必然是有用处的，千两黄金花完了也能够再次获得。', tags: ['李白', '自信'] },

      // 节日相关
      { text: '独在异乡为异客，每逢佳节倍思亲。', category: '唐诗', difficulty: 'medium', keywords: ['思乡', '节日'], explanation: '独自远离家乡无法与家人团聚，每到重阳佳节倍加思念远方的亲人。', tags: ['王维', '思乡'] },
      { text: '爆竹声中一岁除，春风送暖入屠苏。', category: '宋诗', difficulty: 'medium', keywords: ['春节', '新年'], explanation: '阵阵轰鸣的爆竹声中，旧的一年已经过去；和暖的春风吹来了新年。', tags: ['王安石', '春节'] },
      { text: '清明时节雨纷纷，路上行人欲断魂。', category: '唐诗', difficulty: 'easy', keywords: ['清明', '怀念'], explanation: '江南清明时节细雨纷纷飘洒，路上羁旅行人个个落魄断魂。', tags: ['杜牧', '清明'] },

      // 品格修养
      { text: '君子坦荡荡，小人长戚戚。', category: '论语', difficulty: 'medium', keywords: ['品格', '心境'], explanation: '君子心胸开阔，神定气安；小人斤斤计较，忧愁不安。', tags: ['品格', '修养'] },
      { text: '德不孤，必有邻。', category: '论语', difficulty: 'easy', keywords: ['品德', '朋友'], explanation: '有道德的人是不会孤单的，一定有志同道合的人来和他相伴。', tags: ['品德', '友谊'] },
      { text: '见贤思齐焉，见不贤而内自省也。', category: '论语', difficulty: 'hard', keywords: ['学习', '反省'], explanation: '见到贤人，就应该向他学习看齐，见到不贤的人，就应该自我反省。', tags: ['学习', '反省'] },

      // 友情亲情
      { text: '慈母手中线，游子身上衣。', category: '唐诗', difficulty: 'easy', keywords: ['母爱', '亲情'], explanation: '慈祥的母亲手里把着针线，为即将远游的孩子赶制新衣。', tags: ['孟郊', '母爱'] },
      { text: '谁言寸草心，报得三春晖。', category: '唐诗', difficulty: 'medium', keywords: ['感恩', '母爱'], explanation: '谁说像小草那样微弱的孝心，能够报答得了像春晖普泽的慈母恩情？', tags: ['孟郊', '感恩'] },
      { text: '海上生明月，天涯共此时。', category: '唐诗', difficulty: 'medium', keywords: ['思念', '团圆'], explanation: '茫茫的海上升起一轮明月，此时你我都在天涯共相望。', tags: ['张九龄', '思念'] },

      // 自然景观
      { text: '黄河之水天上来，奔流到海不复回。', category: '唐诗', difficulty: 'medium', keywords: ['黄河', '壮阔'], explanation: '黄河之水从天上奔腾而来，波涛翻滚直奔东海，从不再往回流。', tags: ['李白', '壮阔'] },
      { text: '大漠孤烟直，长河落日圆。', category: '唐诗', difficulty: 'medium', keywords: ['大漠', '日落'], explanation: '浩瀚沙漠中孤烟直上，无尽黄河上落日浑圆。', tags: ['王维', '边塞'] },
      { text: '飞流直下三千尺，疑是银河落九天。', category: '唐诗', difficulty: 'medium', keywords: ['瀑布', '想象'], explanation: '高崖上飞腾直落的瀑布好像有几千尺，让人恍惚以为银河从九天倾泻下来。', tags: ['李白', '瀑布'] },

      // 励志成长
      { text: '少年易老学难成，一寸光阴不可轻。', category: '宋诗', difficulty: 'medium', keywords: ['时间', '学习'], explanation: '青春的日子十分容易逝去，学问却很难获得成功，所以每一寸光阴都要珍惜，不能轻易放过。', tags: ['朱熹', '珍惜时间'] },
      { text: '黑发不知勤学早，白首方悔读书迟。', category: '唐诗', difficulty: 'medium', keywords: ['学习', '后悔'], explanation: '少年时只知道玩，不知道要好好学习，到老的时候才后悔自己年少时为什么不知道要勤奋学习。', tags: ['颜真卿', '勤学'] },
      { text: '莫等闲，白了少年头，空悲切。', category: '宋词', difficulty: 'medium', keywords: ['时间', '奋斗'], explanation: '好男儿，要抓紧时间为国建功立业，不要空空将青春消磨，等年老时徒自悲切。', tags: ['岳飞', '励志'] },

      // 处世哲学
      { text: '水至清则无鱼，人至察则无徒。', category: '史记', difficulty: 'hard', keywords: ['包容', '处世'], explanation: '水太清了，鱼就无法生存，人太苛求，就不会有伙伴。', tags: ['包容', '智慧'] },
      { text: '塞翁失马，焉知非福。', category: '史记', difficulty: 'medium', keywords: ['得失', '心态'], explanation: '比喻一时虽然受到损失，也许反而因此能得到好处。', tags: ['得失', '哲理'] },
      { text: '知人者智，自知者明。', category: '老子', difficulty: 'medium', keywords: ['智慧', '认识'], explanation: '能了解别人的人是有智慧的，能了解自己的人是高明的。', tags: ['智慧', '自知'] },

      // 传统文化
      { text: '礼之用，和为贵。', category: '论语', difficulty: 'medium', keywords: ['礼仪', '和谐'], explanation: '礼的应用，以和谐为贵。', tags: ['礼仪', '和谐'] },
      { text: '学而不思则罔，思而不学则殆。', category: '论语', difficulty: 'medium', keywords: ['学习', '思考'], explanation: '只学习而不思考就会感到迷茫而无所适从，只思考而不学习就会疑惑而无所得。', tags: ['学习方法', '思考'] },
      { text: '有朋自远方来，不亦乐乎？', category: '论语', difficulty: 'easy', keywords: ['朋友', '快乐'], explanation: '有志同道合的人从远方来，不是很快乐的事吗？', tags: ['友谊', '快乐'] },

      // 品格情操
      { text: '富贵不能淫，贫贱不能移，威武不能屈。', category: '孟子', difficulty: 'hard', keywords: ['品格', '坚持'], explanation: '富贵不能使我骄奢淫逸，贫贱不能使我改变志向，威武不能使我屈服意志。', tags: ['品格', '节操'] },
      { text: '先天下之忧而忧，后天下之乐而乐。', category: '宋文', difficulty: 'hard', keywords: ['忧国', '责任'], explanation: '为天下人忧虑在前，为天下人享乐在后。', tags: ['范仲淹', '责任'] },
      { text: '鞠躬尽瘁，死而后已。', category: '三国志', difficulty: 'medium', keywords: ['奉献', '忠诚'], explanation: '指勤勤恳恳，竭尽心力，到死为止。', tags: ['诸葛亮', '奉献'] }
    ]
  },

  {
    id: 'math',
    name: '数学',
    description: '探索数学世界的奥秘',
    icon: '🔢',
    color: 'blue',
    items: [
      // 基础运算
      { text: '加法交换律：a + b = b + a，两个数相加，交换位置，和不变。', category: '基础运算', difficulty: 'easy', keywords: ['加法', '交换律'], explanation: '无论两个数的位置如何，相加的结果都是相同的。', tags: ['运算律', '基础'] },
      { text: '乘法分配律：(a + b) × c = a × c + b × c，非常实用的计算技巧。', category: '基础运算', difficulty: 'medium', keywords: ['乘法', '分配律'], explanation: '一个数乘以两个数的和，等于这个数分别乘以那两个数，再把积相加。', tags: ['运算律', '技巧'] },
      { text: '分数加法：分母相同直接加分子，分母不同先通分再相加。', category: '分数', difficulty: 'medium', keywords: ['分数', '加法'], explanation: '同分母分数相加减，分母不变，分子相加减；异分母分数相加减，先通分，再按同分母分数的法则进行。', tags: ['分数', '基础'] },
      { text: '小数乘法：先按整数乘法计算，再看因数中共有几位小数，就从积的右边起数出几位，点上小数点。', category: '小数', difficulty: 'medium', keywords: ['小数', '乘法'], explanation: '小数乘法的计算方法，关键是确定小数点的位置。', tags: ['小数', '乘法'] },
      { text: '除法的意义：把一个数平均分成若干份，求每份是多少的运算。', category: '基础运算', difficulty: 'easy', keywords: ['除法', '平均分'], explanation: '除法是四则运算之一，是已知两个因数的积与其中一个因数，求另一个因数的运算。', tags: ['除法', '概念'] },

      // 几何图形
      { text: '三角形内角和等于180°，这是几何学中的重要定理。', category: '几何', difficulty: 'medium', keywords: ['三角形', '内角和'], explanation: '任意三角形的三个内角的度数相加等于180度。', tags: ['几何', '定理'] },
      { text: '圆的周长公式：C = 2πr，其中r是半径，π约等于3.14。', category: '几何', difficulty: 'medium', keywords: ['圆', '周长'], explanation: '圆的周长等于直径乘以圆周率，也等于2倍半径乘以圆周率。', tags: ['圆', '公式'] },
      { text: '圆的面积公式：S = πr²，半径的平方乘以π。', category: '几何', difficulty: 'medium', keywords: ['圆', '面积'], explanation: '圆的面积等于圆周率乘以半径的平方。', tags: ['圆', '公式'] },
      { text: '长方形的面积 = 长 × 宽，周长 = (长 + 宽) × 2。', category: '几何', difficulty: 'easy', keywords: ['长方形', '面积'], explanation: '长方形是最基本的四边形，其面积和周长公式很实用。', tags: ['长方形', '公式'] },
      { text: '正方形的面积 = 边长²，周长 = 边长 × 4。', category: '几何', difficulty: 'easy', keywords: ['正方形', '面积'], explanation: '正方形是特殊的长方形，四条边都相等。', tags: ['正方形', '公式'] },
      { text: '平行四边形的面积 = 底 × 高，底和高要相互垂直。', category: '几何', difficulty: 'medium', keywords: ['平行四边形', '面积'], explanation: '平行四边形的面积计算需要注意底和高的垂直关系。', tags: ['平行四边形', '公式'] },
      { text: '三角形的面积 = 底 × 高 ÷ 2，可以看作平行四边形面积的一半。', category: '几何', difficulty: 'medium', keywords: ['三角形', '面积'], explanation: '三角形面积公式，底和高也要垂直。', tags: ['三角形', '公式'] },
      { text: '梯形的面积 = (上底 + 下底) × 高 ÷ 2。', category: '几何', difficulty: 'medium', keywords: ['梯形', '面积'], explanation: '梯形面积公式，两底之和乘以高再除以2。', tags: ['梯形', '公式'] },

      // 数的认识
      { text: '质数是只有1和它本身两个因数的自然数，如2、3、5、7、11等。', category: '数的认识', difficulty: 'medium', keywords: ['质数', '因数'], explanation: '质数也叫素数，是数论中的基本概念。', tags: ['质数', '概念'] },
      { text: '合数是除了1和它本身还有其他因数的自然数，如4、6、8、9等。', category: '数的认识', difficulty: 'medium', keywords: ['合数', '因数'], explanation: '合数与质数相对，有多个因数。', tags: ['合数', '概念'] },
      { text: '偶数是能被2整除的数，个位是0、2、4、6、8的数。', category: '数的认识', difficulty: 'easy', keywords: ['偶数', '整除'], explanation: '偶数的特征很容易识别，看个位数字即可。', tags: ['偶数', '特征'] },
      { text: '奇数是不能被2整除的数，个位是1、3、5、7、9的数。', category: '数的认识', difficulty: 'easy', keywords: ['奇数', '整除'], explanation: '奇数与偶数相对，个位数字是奇数。', tags: ['奇数', '特征'] },
      { text: '最大公因数是两个或多个数的公因数中最大的一个。', category: '数的认识', difficulty: 'hard', keywords: ['最大公因数', '公因数'], explanation: '求最大公因数有多种方法，如列举法、短除法等。', tags: ['最大公因数', '概念'] },
      { text: '最小公倍数是两个或多个数的公倍数中最小的一个。', category: '数的认识', difficulty: 'hard', keywords: ['最小公倍数', '公倍数'], explanation: '求最小公倍数的方法与求最大公因数类似。', tags: ['最小公倍数', '概念'] },

      // 统计与概率
      { text: '平均数 = 总数 ÷ 个数，反映一组数据的平均水平。', category: '统计', difficulty: 'medium', keywords: ['平均数', '统计'], explanation: '平均数是统计学中的重要概念，用来表示数据的集中趋势。', tags: ['平均数', '统计'] },
      { text: '中位数是将数据按大小顺序排列后，位于中间位置的数。', category: '统计', difficulty: 'medium', keywords: ['中位数', '排序'], explanation: '中位数不受极端值影响，是另一种表示数据集中趋势的方法。', tags: ['中位数', '统计'] },
      { text: '众数是在一组数据中出现次数最多的数。', category: '统计', difficulty: 'easy', keywords: ['众数', '频率'], explanation: '众数反映了数据的集中情况，一组数据可能有多个众数。', tags: ['众数', '统计'] },
      { text: '可能性有三种：一定发生、可能发生、不可能发生。', category: '概率', difficulty: 'easy', keywords: ['可能性', '概率'], explanation: '概率的初步认识，事件发生的可能性大小。', tags: ['概率', '基础'] },

      // 代数思维
      { text: '用字母表示数是代数的基本思想，如用a表示苹果的个数。', category: '代数', difficulty: 'medium', keywords: ['字母', '代数'], explanation: '用字母表示数可以使问题更加一般化，是代数思维的开始。', tags: ['代数', '字母'] },
      { text: '等式的性质：等式两边同时加上或减去同一个数，等式仍然成立。', category: '代数', difficulty: 'medium', keywords: ['等式', '性质'], explanation: '等式的基本性质是解方程的基础。', tags: ['等式', '性质'] },
      { text: '等式的性质：等式两边同时乘以或除以同一个不为0的数，等式仍然成立。', category: '代数', difficulty: 'medium', keywords: ['等式', '性质'], explanation: '注意除法时除数不能为0。', tags: ['等式', '性质'] },

      // 测量单位
      { text: '长度单位：千米(km) > 米(m) > 分米(dm) > 厘米(cm) > 毫米(mm)。', category: '计量单位', difficulty: 'easy', keywords: ['长度', '单位'], explanation: '长度单位的换算关系，相邻单位间的进率是10。', tags: ['长度', '单位'] },
      { text: '面积单位：平方千米 > 平方米 > 平方分米 > 平方厘米。', category: '计量单位', difficulty: 'medium', keywords: ['面积', '单位'], explanation: '面积单位相邻间的进率是100。', tags: ['面积', '单位'] },
      { text: '重量单位：吨(t) > 千克(kg) > 克(g)，1吨=1000千克=1000000克。', category: '计量单位', difficulty: 'medium', keywords: ['重量', '单位'], explanation: '重量单位的换算，在生活中经常用到。', tags: ['重量', '单位'] },
      { text: '时间单位：1年=12个月，1天=24小时，1小时=60分钟，1分钟=60秒。', category: '计量单位', difficulty: 'easy', keywords: ['时间', '单位'], explanation: '时间单位的换算关系，与其他单位进率不同。', tags: ['时间', '单位'] },

      // 数学思想
      { text: '化繁为简：把复杂的问题分解成简单的小问题来解决。', category: '数学思想', difficulty: 'medium', keywords: ['化简', '方法'], explanation: '化繁为简是重要的数学思想方法。', tags: ['方法', '思想'] },
      { text: '数形结合：把抽象的数学问题与直观的图形结合起来。', category: '数学思想', difficulty: 'medium', keywords: ['数形结合', '方法'], explanation: '数形结合让抽象问题变得更直观。', tags: ['方法', '思想'] },
      { text: '类比推理：根据两个对象的某些相同特征，推出它们在其他方面也可能相同。', category: '数学思想', difficulty: 'hard', keywords: ['类比', '推理'], explanation: '类比是重要的数学思维方法。', tags: ['推理', '思想'] },
      { text: '反向思考：从问题的结果出发，逆向推理求解过程。', category: '数学思想', difficulty: 'medium', keywords: ['反向', '思考'], explanation: '反向思考常常能找到解题的突破口。', tags: ['方法', '思考'] },

      // 实际应用
      { text: '购物中的数学：计算价格、找零钱、比较性价比都需要数学知识。', category: '应用', difficulty: 'easy', keywords: ['购物', '应用'], explanation: '数学在日常生活中无处不在。', tags: ['应用', '生活'] },
      { text: '时间管理：合理安排时间需要加减法和时间单位换算。', category: '应用', difficulty: 'easy', keywords: ['时间', '管理'], explanation: '学会时间计算对生活很重要。', tags: ['应用', '时间'] },
      { text: '烹饪中的数学：调配比例、计算分量都用到数学知识。', category: '应用', difficulty: 'medium', keywords: ['烹饪', '比例'], explanation: '烹饪是很好的数学应用场景。', tags: ['应用', '比例'] },
      { text: '体育中的数学：计算得分、统计成绩、分析数据。', category: '应用', difficulty: 'medium', keywords: ['体育', '统计'], explanation: '体育运动中有很多数学问题。', tags: ['应用', '体育'] },

      // 趣味数学
      { text: '黄金分割比约等于0.618，在自然界和艺术中广泛存在。', category: '趣味数学', difficulty: 'hard', keywords: ['黄金分割', '比例'], explanation: '黄金分割是数学中的美丽比例。', tags: ['黄金分割', '美学'] },
      { text: '斐波那契数列：1, 1, 2, 3, 5, 8, 13...每项等于前两项之和。', category: '趣味数学', difficulty: 'hard', keywords: ['斐波那契', '数列'], explanation: '斐波那契数列在自然界中有神奇的体现。', tags: ['数列', '自然'] },
      { text: '完全数：等于其所有真因数之和的数，如6=1+2+3。', category: '趣味数学', difficulty: 'hard', keywords: ['完全数', '因数'], explanation: '完全数是数学中的特殊数字。', tags: ['完全数', '特殊'] },
      { text: '质数的分布：虽然变得越来越稀疏，但永远有无穷多个。', category: '趣味数学', difficulty: 'hard', keywords: ['质数', '无穷'], explanation: '欧几里得证明了质数有无穷多个。', tags: ['质数', '证明'] },

      // 解题策略
      { text: '画图策略：复杂的应用题可以通过画图来理解和解决。', category: '解题策略', difficulty: 'medium', keywords: ['画图', '策略'], explanation: '画图是很有效的解题方法。', tags: ['策略', '画图'] },
      { text: '列表策略：把条件和数据用表格整理，问题会更清晰。', category: '解题策略', difficulty: 'medium', keywords: ['列表', '整理'], explanation: '列表可以让信息更有条理。', tags: ['策略', '列表'] },
      { text: '枚举策略：把所有可能情况一一列出，确保不遗漏。', category: '解题策略', difficulty: 'medium', keywords: ['枚举', '列举'], explanation: '枚举是彻底的解题方法。', tags: ['策略', '枚举'] },
      { text: '假设策略：先假设某个条件，然后验证是否正确。', category: '解题策略', difficulty: 'medium', keywords: ['假设', '验证'], explanation: '假设法常用于解决复杂问题。', tags: ['策略', '假设'] },

      // 数学历史
      { text: '阿拉伯数字实际上起源于印度，后来由阿拉伯人传播到欧洲。', category: '数学历史', difficulty: 'medium', keywords: ['阿拉伯数字', '历史'], explanation: '了解数学的历史发展。', tags: ['历史', '数字'] },
      { text: '圆周率π是圆周长与直径的比值，是一个无理数。', category: '数学历史', difficulty: 'medium', keywords: ['圆周率', '无理数'], explanation: 'π是数学中最重要的常数之一。', tags: ['圆周率', '常数'] },
      { text: '毕达哥拉斯定理：直角三角形中，斜边的平方等于两直角边的平方和。', category: '数学历史', difficulty: 'hard', keywords: ['毕达哥拉斯', '定理'], explanation: '这是几何学中最著名的定理之一。', tags: ['定理', '几何'] },
      { text: '负数的概念在中国古代就有了，比欧洲早了一千多年。', category: '数学历史', difficulty: 'medium', keywords: ['负数', '中国'], explanation: '中国古代数学有很多重要贡献。', tags: ['历史', '负数'] }
    ]
  },

  {
    id: 'fairy',
    name: '童话',
    description: '进入奇幻的童话世界',
    icon: '🏰',
    color: 'pink',
    items: [
      // 经典童话开头
      { text: '从前有座小城堡，住着一位勇敢的小骑士，他每天都梦想着去冒险。', category: '冒险', difficulty: 'easy', keywords: ['城堡', '骑士'], explanation: '经典的童话开头，充满了冒险的期待。', tags: ['冒险', '勇敢'] },
      { text: '在遥远的森林深处，有一棵会说话的老橡树，它知道所有动物的秘密。', category: '森林', difficulty: 'easy', keywords: ['森林', '说话的树'], explanation: '神奇的森林总是童话故事的好背景。', tags: ['森林', '神奇'] },
      { text: '小狐狸捡到一颗会发光的果实，当它咬下一口时，奇迹发生了。', category: '动物', difficulty: 'easy', keywords: ['狐狸', '发光'], explanation: '动物主角的神奇遭遇，是童话的经典情节。', tags: ['动物', '奇迹'] },
      { text: '在云朵上面住着一群彩虹精灵，它们负责给世界涂上美丽的颜色。', category: '精灵', difficulty: 'medium', keywords: ['云朵', '彩虹'], explanation: '精灵的世界总是充满色彩和魔法。', tags: ['精灵', '彩虹'] },
      { text: '月亮婆婆有一个神奇的摇篮，每当小星星困了，就会到这里来睡觉。', category: '天空', difficulty: 'easy', keywords: ['月亮', '星星'], explanation: '天空中的故事总是那么温馨。', tags: ['月亮', '温馨'] },

      // 魔法世界
      { text: '小女巫丽莎的魔法棒今天不听话了，每次施魔法都变成了相反的效果。', category: '魔法', difficulty: 'medium', keywords: ['女巫', '魔法棒'], explanation: '魔法出错的有趣故事。', tags: ['魔法', '意外'] },
      { text: '魔法森林里有一所特别的学校，专门教小动物们学习人类的语言。', category: '魔法', difficulty: 'medium', keywords: ['魔法森林', '学校'], explanation: '教育主题的魔法故事。', tags: ['魔法', '学习'] },
      { text: '巫师爷爷的魔法药水配方被风吹散了，小助手们开始了寻找之旅。', category: '魔法', difficulty: 'medium', keywords: ['巫师', '药水'], explanation: '寻找失物的冒险故事。', tags: ['魔法', '寻找'] },
      { text: '有一面魔镜可以实现愿望，但每个愿望都需要用善良的行为来交换。', category: '魔法', difficulty: 'medium', keywords: ['魔镜', '愿望'], explanation: '教导善良品德的魔法故事。', tags: ['魔法', '善良'] },
      { text: '在魔法图书馆里，每本书都是活的，它们会向读者讲述自己的故事。', category: '魔法', difficulty: 'medium', keywords: ['图书馆', '活书'], explanation: '鼓励阅读的神奇故事。', tags: ['魔法', '读书'] },

      // 动物朋友
      { text: '小兔子贝贝学会了跳舞，它决定举办一场森林舞会，邀请所有朋友参加。', category: '动物', difficulty: 'easy', keywords: ['兔子', '跳舞'], explanation: '友谊和分享的温暖故事。', tags: ['动物', '友谊'] },
      { text: '聪明的小猴子发明了一台可以翻译动物语言的机器，从此动物们可以和人类对话了。', category: '动物', difficulty: 'medium', keywords: ['猴子', '翻译'], explanation: '科技与动物结合的创意故事。', tags: ['动物', '发明'] },
      { text: '小熊猫开了一家甜品店，专门制作用竹叶包装的特色蛋糕。', category: '动物', difficulty: 'easy', keywords: ['熊猫', '甜品'], explanation: '创业主题的可爱故事。', tags: ['动物', '美食'] },
      { text: '会唱歌的小夜莺失去了声音，森林里的朋友们一起帮它找回美妙的歌声。', category: '动物', difficulty: 'medium', keywords: ['夜莺', '唱歌'], explanation: '互相帮助的感人故事。', tags: ['动物', '帮助'] },
      { text: '小乌龟虽然跑得慢，但它有一个特殊才能——能听懂植物的心声。', category: '动物', difficulty: 'medium', keywords: ['乌龟', '植物'], explanation: '每个人都有独特天赋的故事。', tags: ['动物', '天赋'] },

      // 公主王子
      { text: '公主艾莉丝不喜欢穿漂亮裙子，她更愿意穿盔甲去保护王国的和平。', category: '公主', difficulty: 'medium', keywords: ['公主', '盔甲'], explanation: '打破传统性别角色的现代童话。', tags: ['公主', '勇敢'] },
      { text: '小王子查理有个秘密：他能和花朵说话，花园里的每朵花都是他的朋友。', category: '王子', difficulty: 'easy', keywords: ['王子', '花朵'], explanation: '温柔王子的美丽故事。', tags: ['王子', '自然'] },
      { text: '在水晶城堡里，公主莉莉雅用音乐的力量治愈着每一个伤心的心灵。', category: '公主', difficulty: 'medium', keywords: ['水晶城堡', '音乐'], explanation: '音乐疗愈的神奇故事。', tags: ['公主', '音乐'] },
      { text: '王子和公主决定交换角色体验一天，结果发现了许多以前不知道的事情。', category: '公主', difficulty: 'medium', keywords: ['交换角色', '体验'], explanation: '换位思考的教育故事。', tags: ['公主', '理解'] },
      { text: '小公主有一支神奇的画笔，她画出的东西都能变成真的。', category: '公主', difficulty: 'medium', keywords: ['画笔', '神奇'], explanation: '创造力的奇幻故事。', tags: ['公主', '创造'] },

      // 季节故事
      { text: '春天来了，雪花精灵们要回到天空，但小雪花不想离开，因为它爱上了大地。', category: '春天', difficulty: 'medium', keywords: ['春天', '雪花'], explanation: '季节更替的浪漫故事。', tags: ['春天', '爱'] },
      { text: '夏日里，萤火虫小镇举办了一年一度的发光比赛，看谁的光芒最温暖。', category: '夏天', difficulty: 'easy', keywords: ['夏天', '萤火虫'], explanation: '夏夜的美丽竞赛。', tags: ['夏天', '比赛'] },
      { text: '秋天的枫叶仙子决定给每片叶子涂上不同的颜色，让森林变成彩色的海洋。', category: '秋天', difficulty: 'medium', keywords: ['秋天', '枫叶'], explanation: '秋天色彩的魔法故事。', tags: ['秋天', '色彩'] },
      { text: '冬天的雪人家族要搬到更冷的地方，小雪人舍不得离开温暖的小镇。', category: '冬天', difficulty: 'easy', keywords: ['冬天', '雪人'], explanation: '离别与成长的温情故事。', tags: ['冬天', '成长'] },
      { text: '四季女神们聚在一起开会，讨论如何让今年的天气更加美好。', category: '四季', difficulty: 'medium', keywords: ['四季', '女神'], explanation: '四季协调的神话故事。', tags: ['四季', '合作'] },

      // 友谊故事
      { text: '一只小猫和一只小狗成为了最好的朋友，它们一起开了一家宠物理发店。', category: '友谊', difficulty: 'easy', keywords: ['猫', '狗'], explanation: '不同物种间的真挚友谊。', tags: ['友谊', '合作'] },
      { text: '孤独的小星星找到了一个朋友——地球上的小女孩，她们每晚都会互相眨眼问候。', category: '友谊', difficulty: 'medium', keywords: ['星星', '女孩'], explanation: '跨越距离的特殊友谊。', tags: ['友谊', '距离'] },
      { text: '三个好朋友分别有不同的超能力，当它们团结在一起时，可以解决任何困难。', category: '友谊', difficulty: 'medium', keywords: ['超能力', '团结'], explanation: '团队合作的力量。', tags: ['友谊', '团队'] },
      { text: '害羞的小象不敢交朋友，直到它遇到了同样害羞的小老鼠。', category: '友谊', difficulty: 'easy', keywords: ['大象', '老鼠'], explanation: '克服羞怯建立友谊的故事。', tags: ['友谊', '勇气'] },
      { text: '朋友之间发生了争吵，但一场突如其来的冒险让它们重新团结起来。', category: '友谊', difficulty: 'medium', keywords: ['争吵', '和解'], explanation: '友谊中的误解与和解。', tags: ['友谊', '和解'] },

      // 成长励志
      { text: '小种子不相信自己能长成大树，直到春雨给了它信心和勇气。', category: '成长', difficulty: 'easy', keywords: ['种子', '信心'], explanation: '自信与成长的励志故事。', tags: ['成长', '信心'] },
      { text: '怕水的小鸭子在妈妈的鼓励下，终于学会了游泳，发现了水中的美妙世界。', category: '成长', difficulty: 'easy', keywords: ['鸭子', '游泳'], explanation: '克服恐惧的成长故事。', tags: ['成长', '勇气'] },
      { text: '笨拙的小熊通过不断练习，最终成为了森林里最棒的蜂蜜采集者。', category: '成长', difficulty: 'medium', keywords: ['熊', '练习'], explanation: '努力与坚持的成功故事。', tags: ['成长', '坚持'] },
      { text: '小蜗牛虽然爬得很慢，但它从不放弃，最终到达了山顶看到了最美的日出。', category: '成长', difficulty: 'medium', keywords: ['蜗牛', '坚持'], explanation: '坚持不懈的励志故事。', tags: ['成长', '毅力'] },
      { text: '认为自己很普通的小花，在蝴蝶的赞美中发现了自己独特的美丽。', category: '成长', difficulty: 'medium', keywords: ['花', '美丽'], explanation: '发现自我价值的故事。', tags: ['成长', '自信'] },

      // 奇幻冒险
      { text: '小探险家发现了一扇通往玩具世界的门，在那里所有玩具都是活的。', category: '冒险', difficulty: 'medium', keywords: ['探险', '玩具'], explanation: '玩具世界的奇幻冒险。', tags: ['冒险', '玩具'] },
      { text: '勇敢的小船长驾驶着纸船，在浴缸里展开了一场惊险的海盗冒险。', category: '冒险', difficulty: 'medium', keywords: ['船长', '海盗'], explanation: '想象力丰富的冒险故事。', tags: ['冒险', '想象'] },
      { text: '小女孩跟着白兔跳进了兔子洞，来到了一个颠倒的奇妙世界。', category: '冒险', difficulty: 'medium', keywords: ['兔子洞', '奇妙'], explanation: '经典的奇幻冒险。', tags: ['冒险', '奇幻'] },
      { text: '迷路的小王子在沙漠中遇到了会说话的玫瑰花，它指引他找到回家的路。', category: '冒险', difficulty: 'medium', keywords: ['沙漠', '玫瑰'], explanation: '寻找回家路的冒险。', tags: ['冒险', '回家'] },
      { text: '小女孩的影子突然活过来了，它们一起经历了一段奇妙的夜间冒险。', category: '冒险', difficulty: 'medium', keywords: ['影子', '夜间'], explanation: '影子的神奇冒险。', tags: ['冒险', '神奇'] },

      // 善良品德
      { text: '小天使失落了翅膀，但因为它的善良行为，翅膀又重新长了出来。', category: '品德', difficulty: 'medium', keywords: ['天使', '善良'], explanation: '善良的力量胜过一切。', tags: ['品德', '善良'] },
      { text: '贪心的小松鼠学会了分享，发现分享比独自拥有更加快乐。', category: '品德', difficulty: 'easy', keywords: ['松鼠', '分享'], explanation: '分享带来快乐的道理。', tags: ['品德', '分享'] },
      { text: '诚实的小木偶从不说谎，所以它的鼻子永远保持着可爱的样子。', category: '品德', difficulty: 'easy', keywords: ['木偶', '诚实'], explanation: '诚实的重要性。', tags: ['品德', '诚实'] },
      { text: '感恩的小鸟每天都为救过它的老爷爷唱最美的歌。', category: '品德', difficulty: 'easy', keywords: ['鸟', '感恩'], explanation: '感恩之心的美好。', tags: ['品德', '感恩'] },
      { text: '宽容的大象原谅了踩疼它脚趾的小蚂蚁，它们成为了好朋友。', category: '品德', difficulty: 'medium', keywords: ['大象', '宽容'], explanation: '宽容带来友谊。', tags: ['品德', '宽容'] },

      // 节日庆典
      { text: '圣诞夜里，所有的玩具都聚在圣诞树下开了一场盛大的派对。', category: '节日', difficulty: 'easy', keywords: ['圣诞', '玩具'], explanation: '圣诞节的欢乐气氛。', tags: ['节日', '圣诞'] },
      { text: '复活节时，彩蛋小镇举办了寻找金蛋的比赛，获胜者可以许一个愿望。', category: '节日', difficulty: 'medium', keywords: ['复活节', '彩蛋'], explanation: '复活节的传统活动。', tags: ['节日', '复活节'] },
      { text: '万圣节晚上，友善的小幽灵帮助迷路的孩子们找到回家的路。', category: '节日', difficulty: 'medium', keywords: ['万圣节', '幽灵'], explanation: '万圣节的温馨故事。', tags: ['节日', '万圣节'] },
      { text: '生日那天，小公主收到了一个特别的礼物——一颗会实现愿望的星星。', category: '节日', difficulty: 'easy', keywords: ['生日', '星星'], explanation: '生日的神奇礼物。', tags: ['节日', '生日'] },
      { text: '新年钟声响起时，十二生肖动物们聚在一起庆祝新的开始。', category: '节日', difficulty: 'medium', keywords: ['新年', '生肖'], explanation: '新年的美好祝愿。', tags: ['节日', '新年'] },

      // 科学奇幻
      { text: '小科学家发明了一台时光机器，她回到了恐龙时代交了一个恐龙朋友。', category: '科幻', difficulty: 'medium', keywords: ['时光机', '恐龙'], explanation: '时间旅行的科幻冒险。', tags: ['科幻', '时间'] },
      { text: '来自外星球的小外星人降落在地球，它和地球小朋友一起学习人类文化。', category: '科幻', difficulty: 'medium', keywords: ['外星人', '文化'], explanation: '友好的外星接触。', tags: ['科幻', '友谊'] },
      { text: '机器人小艾学会了感受情感，它的心脏开始跳动，眼中流下了快乐的泪水。', category: '科幻', difficulty: 'hard', keywords: ['机器人', '情感'], explanation: '人工智能的情感觉醒。', tags: ['科幻', '情感'] },
      { text: '未来世界里，小女孩骑着飞行独角兽穿越彩虹桥去上学。', category: '科幻', difficulty: 'medium', keywords: ['未来', '独角兽'], explanation: '未来世界的美好想象。', tags: ['科幻', '未来'] },
      { text: '神奇的全息图书馆里，每本书都能让读者亲身体验故事情节。', category: '科幻', difficulty: 'hard', keywords: ['全息', '图书馆'], explanation: '未来阅读的新体验。', tags: ['科幻', '阅读'] }
    ]
  }
]