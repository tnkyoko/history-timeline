// 初始时间轴数据
let timelineData = {
    "title": {
        "text": {
            "headline": "可编辑时间轴",
            "text": "通过表单添加事件"
        }
    },
    "events": []
};

// 创建 TimelineJS 实例
let timeline = new TL.Timeline('timeline', timelineData);
 
// 假设您的时间轴数据如下所示
let timelineData = {
    "events": [
        {
            "start_date": {
                "year": "1900",
                "month": "1",
                "day": "1"
            },
            "end_date": {
                "year": "1900",
                "month": "12",
                "day": "31"
            },
            "text": {
                "headline": "事件标题",
                "text": "事件描述"
            }
        },
        // ... 更多事件 ...
    ]
};

// 在页面加载完毕后创建 TimelineJS 实例
document.addEventListener('DOMContentLoaded', function() {
    // 使用时间轴数据实例化 TimelineJS
    let timeline = new TL.Timeline('timeline', timelineData, {
        // 选项，例如：
        // "hash_bookmark": true,
        // "default_bg_color": {r:255, g:255, b:255},
        // ... 其他选项 ...
    });
});
 
// 处理表单提交事件
const form = document.getElementById('add-event-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 获取表单数据
    const startYear = document.getElementById('start-year').value;
    const startMonth = document.getElementById('start-month').value;
    const startDay = document.getElementById('start-day').value;
    const headline = document.getElementById('headline').value;
    const text = document.getElementById('text').value;
    const mediaUrl = document.getElementById('media-url').value;

    // 创建新事件对象
    const newEvent = {
        "start_date": {
            "year": startYear,
            "month": startMonth,
            "day": startDay
        },
        "text": {
            "headline": headline,
            "text": text
        }
    };

    // 如果有媒体链接，添加到事件对象中
    if (mediaUrl) {
        newEvent.media = {
            "url": mediaUrl
        };
    }

    // 将新事件添加到时间轴数据中
    timelineData.events.push(newEvent);

    // 重新渲染时间轴
    timeline.update(timelineData);

    // 清空表单
    form.reset();

    // 更新删除按钮
    addDeleteButtons();
});

// 添加删除按钮的逻辑
function addDeleteButtons() {
    // 移除现有的删除按钮
    const existingDeleteButtons = document.querySelectorAll('.delete');
    existingDeleteButtons.forEach(button => button.remove());

    // 为每个事件添加删除按钮
    timelineData.events.forEach((event, index) => {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.classList.add('delete');
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', function() {
            // 删除事件
            timelineData.events.splice(index, 1);
            // 重新渲染时间轴
            timeline.update(timelineData);
            // 更新删除按钮
            addDeleteButtons();
        });
        document.getElementById('timeline').appendChild(deleteButton);
    });
}

// 初始化删除按钮
addDeleteButtons();
