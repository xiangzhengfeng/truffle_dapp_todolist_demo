// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract TodolistDemo {
    uint256 beforeDeleteId;

    struct List {
        uint256 id; // id
        uint256 time; // 时间
        uint256 content; // 内容
        address writer; // 写入者
        bool isDone; // 是否完成
    }

    List[] public lists;

    event HanderList(
        uint256 id,
        uint256 time,
        uint256 content,
        address writer,
        bool isDone
    );

    modifier LegalId(uint256 id) {
        require(id <= lists.length, "id no fund");
        require(id >= 0, "id no fund");
        _;
    }

    function add(uint256 content) public {
        emit HanderList(
            beforeDeleteId,
            block.timestamp,
            content,
            msg.sender,
            false
        );
        if (beforeDeleteId == lists.length) {
            lists.push(
                List(
                    beforeDeleteId,
                    block.timestamp,
                    content,
                    msg.sender,
                    false
                )
            );
            beforeDeleteId++;
        } else {
            lists[beforeDeleteId].id = beforeDeleteId;
            lists[beforeDeleteId].time = block.timestamp;
            lists[beforeDeleteId].content = content;
            lists[beforeDeleteId].writer = msg.sender;
            lists[beforeDeleteId].isDone = false;

            beforeDeleteId = lists.length;
        }
    }

    function getLength() public view returns (uint256) {
        return lists.length;
    }

    function done(uint256 id) public LegalId(id) {
        List storage list = lists[id];
        require(list.isDone == false);
        list.isDone = true;
    }

    function remove(uint256 id) public LegalId(id) {
        List storage list = lists[id];
        require(list.isDone == true);
        delete lists[id];
        beforeDeleteId = id;
    }
}
