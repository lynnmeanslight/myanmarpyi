// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyanmarPyi {
    struct Message {
        address author;
        uint64 timestamp;
        string text;
        bool hidden;
    }

    enum Emoji {
        LIKE, // 👍
        LOVE, // ❤️
        LAUGH, // 😂
        SAD, // 😢
        FIRE, // 🔥
        SUPPORT // 🙏
    }

    mapping(uint8 => Message[]) private _messagesByRegion;
    mapping(address => uint64) public nextPostAt;

    // regionId => messageIndex => emoji => count
    mapping(uint8 => mapping(uint256 => mapping(Emoji => uint256)))
        public emojiCount;

    // regionId => messageIndex => user => emoji => reacted?
    mapping(uint8 => mapping(uint256 => mapping(address => mapping(Emoji => bool))))
        public hasReactedEmoji;

    address public immutable OWNER;
    bool public paused;
    uint64 public cooldown = 60;

    uint8 public minRegion = 1;
    uint8 public maxRegion = 15;

    uint256 public constant MIN_LEN = 1;
    uint256 public constant MAX_LEN = 200;

    event MessagePosted(
        uint8 indexed regionId,
        address indexed author,
        uint64 timestamp,
        string text
    );

    event EmojiReacted(
        uint8 indexed regionId,
        uint256 indexed messageIndex,
        address indexed user,
        Emoji emoji
    );

    event MessageHidden(uint8 indexed regionId, uint256 index);
    event Paused(bool paused);
    event CooldownUpdated(uint64 newCooldown);
    event RegionBoundsUpdated(uint8 min, uint8 max);

    modifier onlyOwner() {
        require(msg.sender == OWNER, "not OWNER");
        _;
    }

    modifier notPaused() {
        require(!paused, "paused");
        _;
    }

    constructor() {
        OWNER = msg.sender;
    }

    function post(uint8 regionId, string calldata text) external notPaused {
        require(regionId >= minRegion && regionId <= maxRegion, "bad region");

        uint256 len = bytes(text).length;
        require(len >= MIN_LEN && len <= MAX_LEN, "bad length");

        require(block.timestamp >= nextPostAt[msg.sender], "cooldown");

        _messagesByRegion[regionId].push(
            Message(msg.sender, uint64(block.timestamp), text, false)
        );

        unchecked {
            nextPostAt[msg.sender] = uint64(block.timestamp) + cooldown;
        }

        emit MessagePosted(regionId, msg.sender, uint64(block.timestamp), text);
    }

    /* ===================== */
    /* ====== VIEWS ======= */
    /* ===================== */

    function messageCount(uint8 regionId) external view returns (uint256) {
        return _messagesByRegion[regionId].length;
    }

    function reactEmoji(
        uint8 regionId,
        uint256 messageIndex,
        Emoji emoji
    ) external notPaused {
        require(regionId >= minRegion && regionId <= maxRegion, "bad region");
        require(
            messageIndex < _messagesByRegion[regionId].length,
            "bad message"
        );

        require(
            !hasReactedEmoji[regionId][messageIndex][msg.sender][emoji],
            "already reacted"
        );

        hasReactedEmoji[regionId][messageIndex][msg.sender][emoji] = true;
        emojiCount[regionId][messageIndex][emoji]++;

        emit EmojiReacted(regionId, messageIndex, msg.sender, emoji);
    }

    function getMessages(
        uint8 regionId,
        uint256 start,
        uint256 count
    ) external view returns (Message[] memory out) {
        uint256 total = _messagesByRegion[regionId].length;
        if (start >= total) return new Message[](0);

        uint256 end = start + count;
        if (end > total) end = total;

        out = new Message[](end - start);
        for (uint256 i = start; i < end; i++) {
            out[i - start] = _messagesByRegion[regionId][i];
        }
    }

    /* ===================== */
    /* ===== ADMIN ========= */
    /* ===================== */

    function hideMessage(uint8 regionId, uint256 index) external onlyOwner {
        require(index < _messagesByRegion[regionId].length, "bad index");
        _messagesByRegion[regionId][index].hidden = true;
        emit MessageHidden(regionId, index);
    }

    function setPaused(bool p) external onlyOwner {
        paused = p;
        emit Paused(p);
    }

    function setCooldown(uint64 s) external onlyOwner {
        cooldown = s;
        emit CooldownUpdated(s);
    }

    function setRegionBounds(uint8 min, uint8 max) external onlyOwner {
        require(min > 0 && min <= max, "bad bounds");
        minRegion = min;
        maxRegion = max;
        emit RegionBoundsUpdated(min, max);
    }
}
