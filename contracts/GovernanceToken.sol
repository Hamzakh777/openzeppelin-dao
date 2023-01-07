// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20, ERC20Permit, ERC20Votes {
    uint256 immutable i_maxSupply;

    constructor(uint256 maxSupply) ERC20("GovernanceToken", "GT") ERC20Permit("GovernanceToken") {
        i_maxSupply = maxSupply;
        _mint(msg.sender, maxSupply); 
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}

// An issue we need to resolve is
// Someone knows a hot proposal is coming up
// So they just buy a ton of tokens and they they just dump it after

// To solve this
// We will take a snapshot of tokens people have at a certain block. 