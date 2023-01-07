// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    constructor(
        // How long you have to wait before executing
        uint256 _minDelay,
        // the list of addresses that can propose
        address[] memory _proposers,
        // who can execute when a proposal passes
        address[] memory _executors,
        address admin
    ) TimelockController(_minDelay, _proposers, _executors, admin) { }
} 