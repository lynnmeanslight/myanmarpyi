// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MyanmarPyi.sol";

contract RegionNotesTest is Test {
    MyanmarPyi private notes;

    function setUp() public {
        notes = new MyanmarPyi();
    }

    function testPostStoresMessage() public {
        notes.post(1, "Hello Myanmar");
        (uint256 count) = notes.messageCount(1);
        assertEq(count, 1);

        RegionNotes.Message[] memory msgs = notes.getMessages(1, 0, 1);
        assertEq(msgs.length, 1);
        assertEq(msgs[0].author, address(this));
        assertEq(msgs[0].hidden, false);
        assertEq(msgs[0].text, "Hello Myanmar");
    }

    function testCooldownBlocksRapidPosts() public {
        notes.post(1, "first");
        vm.expectRevert("cooldown");
        notes.post(1, "second");

        vm.warp(block.timestamp + 61);
        notes.post(1, "third");
        assertEq(notes.messageCount(1), 2);
    }

    function testHideMarksMessage() public {
        notes.post(2, "nice place");
        notes.hideMessage(2, 0);
        RegionNotes.Message[] memory msgs = notes.getMessages(2, 0, 1);
        assertTrue(msgs[0].hidden);
    }

    function testRegionBoundsRevert() public {
        vm.expectRevert("bad region");
        notes.post(0, "bad");
    }
}
